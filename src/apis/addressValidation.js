export type AddressValidationResult = {
    isValid: bool,
    isStellarAddress?: bool
}

export type SeedValidationResult = {
    isValid: bool,
    stellarAddress?: string
}

export function validateAddress(address: string) : AddressValidationResult {
    if (window.StellarSdk.StrKey.isValidEd25519PublicKey(address)) {
        return {isValid: true, isStellarAddress: true}
    }

    // TODO: Think about how to validate other addresses - or push to server.
    if (address.length > 10) {
        return {isValid: true, isStellarAddress: false}
    }

    return {isValid: false}
}

export function validateAndResolveSeed(seed: string) : SeedValidationResult {
    if (window.StellarSdk.StrKey.isValidEd25519SecretSeed(seed)) {
        const kp = window.StellarSdk.Keypair.fromSecret(seed)

        return {isValid: true, stellarAddress: kp.publicKey()}
    }

    return {isValid: false}
}