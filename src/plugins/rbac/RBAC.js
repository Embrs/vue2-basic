import RBAC from "rbac";
import roles from "./Roles";
import permissions from "./Permissions";
import grants from "./Grants";

const rbac = new RBAC(
  {
    roles,
    permissions,
    grants
  },
  err => {
    if (err) throw err;
  }
);

export default rbac;
