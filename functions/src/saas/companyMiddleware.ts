
export function withCompany(context: any) {

  const companyId = context.auth?.token?.companyId;

  if (!companyId) {
    throw new Error("Unauthorized company");
  }

  return companyId;
}
