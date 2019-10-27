export const url = 'api/';
// 加密接口
export const publicApi = {
  imgCode: 'merchant/code/img',
  smsCode: 'merchant/code/username',
  key: 'merchant/cst/encrypt/key',
  examineUserName: 'merchant/cst/regist/username/check'
};
export const register = {
  registerConfirm: 'merchant/cst/regist'
};
// 以下为初版pm接口
export const business = {
  all: 'admin/businessConfig/platform/all',
  page: 'admin/businessConfig/platform/page',
  platform: 'admin/businessConfig/platform',
  platformStatus: 'admin/businessConfig/platformStatus',
  queryBusinessAuditList: 'wf/queryBusinessAuditList',
  merCustom: 'ecs/merCustom/merchant/',
  queryAuditHitory: 'wf/queryAuditHitory',
  completeAuditProcess: 'wf/completeAuditProcess',
  queryAuditCircuits: 'wf/queryAuditCircuits',
  saveAuditCircuit: 'wf/saveAuditCircuit',
  queryAuditBizRel: 'wf/queryAuditBizRel',
  queryConfigDetail: 'wf/queryConfigDetail',
  tenantRole: 'pm/tenantRole/all',
  tenantUser: 'pm/tenantUser/all',
  modifyAuditConfig: 'wf/modifyAuditConfig',
  tenantList: 'pm/tenantRoleUser/getTenUserByRole',
  tenantRoleUser: 'pm/tenantRoleUser/all',
};
