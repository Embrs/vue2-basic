import Vue from "vue";
import VueRouter from "vue-router";
import routes from "vue-auto-routing";
import { equals, isEmpty } from "@/plugins/utils";
import {
  can,
  exists,
  getScope,
  ClearAllPermission,
  InsertPermission
} from "@/plugins/rbac";
import { LoadingBar } from "view-design";

// 去除 stacktrace 異常
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

// router
routes.push({
  path: "/*",
  redirect: "/Welcome/SignIn"
});
console.log(routes);
const router = new VueRouter({
  routes
});

// 登出
const SignOut = next => {
  const rbacData = localStorage.getObjectHash(window.rbacRule);
  if (!isEmpty(rbacData)) {
    const rbacData = localStorage.getObjectHash(window.rbacRule);
    Object.keys(rbacData).forEach(tag => {
      ClearAllPermission(rbacData.role, tag); // 撤銷權限
    });
  }

  // 保存暫存帳號
  const _accInfo = localStorage.getObjectHash(window.acc);
  window.localStorage.clear();
  if (!isEmpty(_accInfo)) {
    localStorage.setObjectHash(window.acc, _accInfo);
  }
  next("/Welcome/SignIn");
};

// 登入至首頁
const AutoFirstView = async (next, role, Group) => {
  // 提取頁面權限
  const permissions = await getScope(role, "pages");
  const Pages = routes.find(obj => obj.name && obj.name === Group).children;
  if (Pages) {
    const result = Pages.filter(i => i.path.indexOf(permissions[0]) !== -1);
    const nextPage = `/${Group}/${result[0].path}`;
    console.log(nextPage);
    next(nextPage);
  }
  next();
};

// 驗證
const Auth = async (toPath, next) => {
  const hasCheckRule = !(toPath.indexOf("/Welcome/") >= 0); // 必須驗證
  const rbacData = localStorage.getObjectHash(window.rbacRule);
  console.log("toPath", toPath);
  // 有權限資料
  if (!isEmpty(rbacData)) {
    // 權限重置保留
    Object.keys(rbacData.rule).forEach(tag => {
      InsertPermission(rbacData.role, rbacData.rule[tag], tag); // 插入權限
    });
  }

  // 必須驗證
  if (hasCheckRule) {
    // 沒有權限資料
    if (isEmpty(rbacData)) {
      return SignOut(next);
    }

    // RBAC如果沒有此角色
    const roleExists = await exists(rbacData.role);
    if (!roleExists) {
      return SignOut(next);
    }

    // RBAC 如果此頁面權限 則前往該頁面
    const pagename = toPath.substr(toPath.lastIndexOf("/") + 1); // 取得頁面
    const CanToPage = await can(rbacData.role, pagename, "pages");
    if (CanToPage) {
      return next();
    }

    // Shop 例外 導至登出
    if (equals(toPath, "/Shop") || equals(toPath, "/Shop/")) {
      AutoFirstView(next, rbacData.role, "Shop");
      return;
    }

    // Backstage 例外 導至首頁
    if (equals(toPath, "/Backstage") || equals(toPath, "/Backstage/")) {
      AutoFirstView(next, rbacData.role, "Backstage");
      return;
    }
    SignOut(next);
  }
  // 特殊路徑處理
  if (equals(toPath, "/Welcome") || equals(toPath, "/Welcome/")) {
    return SignOut(next);
  }
  next();
};

// -----------------------------------------------

// 頁面載入觸發
router.beforeEach(async (to, from, next) => {
  LoadingBar.start();
  await Auth(to.path, next);
  LoadingBar.finish();
});

// 頁面載入完成
router.afterEach(() => {
  return true;
});

export default router;
