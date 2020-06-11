import rbac from "./RBAC";

// tag is pages and components
// const tag = "pages";

/**
 * 檢查權限
 * @param { String } roleName
 * @param { String } action
 * @param { String } resource
 * @returns { Boolean }
 *
 * @example
 */
const can = (roleName, action, resource) =>
  new Promise(resolve => {
    rbac.can(roleName, action, resource, (err, Iscan) => {
      resolve(Iscan);
    });
  });

/**
 * Get instance of Role or Permission by his name
 * @param { * } name
 */
export const get = name => {
  let instance = false;
  rbac.get(name, (err, res) => (instance = res));
  return instance;
};

/**
 * 檢查 是否有此角色
 * @param { String } roleName
 * @returns { Boolean }
 *
 * @example
 * await exists("system")
 */
const exists = roleName =>
  new Promise(resolve => {
    rbac.exists(roleName, (err, exists) => {
      resolve(exists);
    });
  });

const getScope = (roleName, tag) =>
  new Promise(resolve => {
    rbac.getScope(roleName, (err, scope) => {
      if (err) {
        resolve([]);
      }
      const result = scope
        .filter(i => i.includes(tag))
        .map(i => i.replace(`_${tag}`, ""));
      resolve(result);
    });
  });

const rbacPlugin = {};
rbacPlugin.install = Vue => {
  Vue.directive("rbac", {
    async bind(el, binding) {
      const { role } = localStorage.getObjectHash("user");

      const _can = await can(role, binding.value, "components");

      // disable components
      if (_can && binding.modifiers.disable) {
        el.style.pointerEvents = "none";
        el.style.opacity = 0.4;
        el.childNodes.forEach(ChildElem => {
          if (ChildElem.localName === "input") {
            ChildElem.readOnly = true;
          }
        });
      }
      // has Permission
      if (_can) {
        return;
      }

      // remove components
      if (el.parentNode) {
        el.parentNode.removeChild(el);
        return;
      }
      el.style.display = "none";
    }
  });
};

// 插入角色
const CreateRole = role => {
  let roles = [role];
  rbac.create(roles, {}, () => {
    return;
  });
};

// 准許權限
const GrantToPermission = (RoleName, Permission, tag) => {
  // 插入權限
  let IsGranted = false;
  const role = get(RoleName);
  const child = get(`${Permission}_${tag}`);
  if (!(role && child)) return IsGranted;
  role.grant(child, (err, granted) => (IsGranted = granted));
  return IsGranted;
};

// 撤銷權限
const RevokePermission = (RoleName, Permission, tag) => {
  let IsRevoke = false;
  const role = get(RoleName);
  const child = get(`${Permission}_${tag}`);
  role.revoke(child, (err, revoke) => (IsRevoke = revoke));
  return IsRevoke;
};

// 插入頁面權限
const InsertPermission = function(RoleName, list, tag) {
  const haveRole = get(RoleName);
  if (!haveRole) {
    CreateRole(RoleName);
  }
  list.forEach(i => {
    GrantToPermission(RoleName, i, tag);
  });
};

// 刪除全部頁面權限
const ClearAllPermission = async function(RoleName, tag) {
  const list = await getScope(RoleName, tag);
  list.forEach(i => {
    RevokePermission(RoleName, i, tag);
  });
};

export {
  can,
  rbacPlugin,
  exists,
  getScope,
  InsertPermission,
  ClearAllPermission
};
