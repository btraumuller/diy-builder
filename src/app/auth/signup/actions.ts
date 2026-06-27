"use server";

export type SignupState = {
  error?: string;
  success?: boolean;
};

export async function signupAction(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const accountType = formData.get("accountType") as string;
  const contractorType = formData.get("contractorType") as string;
  const contractorOther = (formData.get("contractorOther") as string)?.trim();

  if (!firstName || !lastName || !email || !accountType) {
    return { error: "Please fill in all required fields." };
  }

  if (accountType === "contractor" && !contractorType) {
    return { error: "Please select your contractor type." };
  }

  if (accountType === "contractor" && contractorType === "Other" && !contractorOther) {
    return { error: "Please describe your specialty." };
  }

  const resolvedContractorType = contractorType === "Other" ? contractorOther : contractorType;

  // TODO: write to DB
  console.log({ firstName, lastName, email, accountType, contractorType: resolvedContractorType });

  return { success: true };
}
