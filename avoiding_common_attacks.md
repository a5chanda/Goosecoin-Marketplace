## Ensuring data entry is accurate
Ensured that there are no non-empty fields that are entered for critical fields. This mitigates any issues we may run into with regards to the price  or listing name being missing for a listing, However, this can eventually be fixed by incorporating some sort of update listing field.

## Ensuring that the correct amount of currency is transacted
While my application isn't fully secure, I have taken measures to ensure that users have enough funds to transact for a listing with the use of 'require' statements. This prompts metamask to provide the user with an alert before confirming a transaction and prevents any unnecessary transactions to be processed by accident.

