import "dotenv/config";

function assertVal(v: string | undefined, name: string): string {
  if (!v) {
    throw new Error("Required env parameter missing: " + name);
  }
  return v;
}

// To set these values for use in local development, you can create a .env file
export const cookieSecret = assertVal(process.env.COOKIE_SECRET, "COOKIE_SECRET");
export const jwtSecret = assertVal(process.env.JWT_SECRET, "JWT_SECRET");

export const prodUrl = assertVal(process.env.PROD_URL, "PROD_URL");
