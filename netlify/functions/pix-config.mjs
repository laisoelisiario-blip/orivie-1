// GET: informa ao app se o pagamento real está ativo e qual é o preço.
import { json, configured, PRICE } from "../lib/mp.mjs";
export default async () => json({ real: configured(), price: PRICE });
