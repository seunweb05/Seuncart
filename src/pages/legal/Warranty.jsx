import LegalPage from "./LegalPage";
export default function Warranty() { return <LegalPage title="Warranty" intro="SEUNCART aims to make product coverage clear before purchase. The warranty shown on an individual product listing controls the exact coverage period and conditions." sections={[
  { title: "Coverage", body: "Where a listing includes manufacturer or store warranty, that listing describes the applicable period and remedy. If no warranty is stated, customers should not assume separate store coverage." },
  { title: "Exclusions", body: "Warranty support may exclude accidental damage, liquid damage, physical damage, unauthorized repair or modification, misuse, normal wear and other conditions stated by the manufacturer or listing." },
  { title: "Making a claim", body: "Contact support with your order reference, product serial or IMEI where relevant, purchase date and a description of the issue. Photos or video may be requested to assess the claim." }
]} />; }
