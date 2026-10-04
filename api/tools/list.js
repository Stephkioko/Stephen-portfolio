import { db } from "hatchable";
export const access = "public";
export const methods = ["GET"];
export default async function(req,res){
  const q = String(req.query?.q || "").trim();
  const brand = String(req.query?.brand || "").trim();
  const chipset = String(req.query?.chipset || "").trim();
  const {rows} = await db.query(
    "SELECT id,name,version,chipset,brand,description,source_url,verified FROM tool_catalog WHERE ($1 = '' OR name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%') AND ($2 = '' OR brand = $2) AND ($3 = '' OR chipset = $3) ORDER BY name ASC LIMIT 100",
    [q,brand,chipset]
  );
  res.json(rows);
}