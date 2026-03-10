export function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[700px] h-[700px] rounded-full opacity-[0.08] blur-[120px]"
        style={{ background: "hsl(160 80% 55%)", top: "5%", right: "10%", animation: "mesh1 12s ease-in-out infinite" }} />
      <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[110px]"
        style={{ background: "hsl(330 70% 55%)", bottom: "10%", left: "5%", animation: "mesh2 15s ease-in-out infinite" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: "hsl(45 90% 55%)", top: "40%", left: "60%", animation: "mesh3 18s ease-in-out infinite" }} />
      <div className="absolute w-[550px] h-[550px] rounded-full opacity-[0.06] blur-[110px]"
        style={{ background: "hsl(220 80% 55%)", top: "60%", left: "15%", animation: "mesh1 20s ease-in-out infinite" }} />
      <div className="absolute w-[450px] h-[450px] rounded-full opacity-[0.05] blur-[100px]"
        style={{ background: "hsl(280 65% 55%)", top: "15%", left: "35%", animation: "mesh2 14s ease-in-out infinite" }} />
    </div>
  );
}
