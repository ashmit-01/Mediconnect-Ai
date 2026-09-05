import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Medi-Connect AI</h1>
      <p>Smart Healthcare & Appointment Platform</p>

      <div className="grid">
        <Link className="card" href="/dashboard">Dashboard</Link>
        <Link className="card" href="/ai">AI Assistant</Link>
        <Link className="card" href="/doctors">Find Doctor</Link>
        <Link className="card" href="/hospitals">Find Hospital</Link>
        <Link className="card" href="/appointments">Appointments</Link>
        <Link className="card" href="/medical-history">Medical History</Link>
        <Link className="card" href="/notifications">Notifications</Link>
      </div>
    </main>
  );
}
