import { Star } from "lucide-react";

const reviews = [
  { name: "Sarah K.", role: "HR Manager", text: "Cut our screening time by 70%. Game-changing.", rating: 5 },
  { name: "James L.", role: "Talent Lead", text: "AI matching is incredibly accurate.", rating: 5 },
  { name: "Priya M.", role: "Recruiter", text: "Understands context, not just keywords.", rating: 5 },
  { name: "David R.", role: "Founder", text: "Built our entire team in 3 months.", rating: 5 },
  { name: "Elena T.", role: "People Ops", text: "Best resume parsing I've seen.", rating: 4 },
  { name: "Matti.", role: "Teppo", text: "The best to ever do it", rating: 4 },
  { name: "Jari.", role: "Värvääjä", text: "Komia on ja voi veljet mitä ukkoja palkkas", rating: 5 },
  { name: "Markku.", role: "Isäntä", text: "Ei tarvinnu sormeakaan nostaa", rating: 5 },
  { name: "Linda H.", role: "Head of Talent", text: "Lopultakin työkalu, joka oikeasti ymmärtää koodareiden CV:t.", rating: 5 },
  { name: "Tuomas S.", role: "CTO", text: "Technical screening used to be a nightmare. Not anymore.", rating: 5 },
  { name: "Anniina P.", role: "HR Specialist", text: "Käyttöliittymä on todella selkeä ja haku toimii salamannopeasti.", rating: 4 },
  { name: "Kevin V.", role: "Startup Founder", text: "Essential for scaling fast without losing quality.", rating: 5 },
  { name: "Sami J.", role: "Yrittäjä", text: "Tämä analyysi löysi helmet massan joukosta heti kättelyssä.", rating: 5 },
  { name: "Rachel G.", role: "Recruitment Consultant", text: "The integration with our workflow was seamless.", rating: 4 },
  { name: "Heikki K.", role: "Toimari", text: "Säästettiin pitkä pennu rekrytointikuluissa.", rating: 5 },
  { name: "Sofia M.", role: "Operations Director", text: "Data-driven hiring is the future, and this tool is it.", rating: 5 },
  { name: "Pertti.", role: "Työnjohtaja", text: "Sieltä tuli just semmosia tekijöitä ku tilattiin.", rating: 5 },
  { name: "Minna L.", role: "Personnel Manager", text: "Vähensi huomattavasti rekrytoinnin manuaalista työtä.", rating: 4 }
];

export function ReviewsCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex animate-scroll gap-4" style={{ width: "max-content" }}>
        {[...reviews, ...reviews].map((review, i) => (
          <div key={i} className="glass-card rounded-lg px-4 py-3 w-[240px] flex-shrink-0 select-none">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: review.rating }).map((_, j) => (
                <Star key={j} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed mb-2">"{review.text}"</p>
            <div>
              <span className="text-xs font-semibold text-foreground">{review.name}</span>
              <span className="text-[10px] text-muted-foreground ml-1.5">{review.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
