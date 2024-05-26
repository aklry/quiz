// 审核状态枚举
const REVIEW_STATUS_ENUM = {
  // 待审核
  REVIEWING: 0,
  // 通过
  PASS: 1,
  // 拒绝
  REJECT: 2
}

// 审核状态映射
const REVIEW_STATUS_MAP = ['待审核', '通过', '拒绝']

export default {
  REVIEW_STATUS_ENUM,
  REVIEW_STATUS_MAP
}
