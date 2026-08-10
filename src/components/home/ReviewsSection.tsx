import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Priya M.",
    rating: 5,
    text: "The quality is genuinely different. My son's birthday tee survived a full day of cake, play, and three washes — still looks new.",
    product: "Birthday Boy Tee",
    verified: true,
  },
  {
    name: "Rahul K.",
    rating: 5,
    text: "Ordered matching family tees for our Goa trip. The fabric is soft and the personalization was perfect. Will definitely order again.",
    product: "Family Vacation Combo",
    verified: true,
  },
  {
    name: "Sneha D.",
    rating: 5,
    text: "I loved that they actually explain the fabric quality instead of just saying 'premium'. The collar hasn't stretched at all after 10+ washes.",
    product: "Little Princess Tee",
    verified: true,
  },
  {
    name: "Amit S.",
    rating: 4,
    text: "Great quality dad-daughter tee set. The print is sharp and hasn't faded. Delivery was fast too.",
    product: "Dad & Daughter Set",
    verified: true,
  },
];

export function ReviewsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Customer Stories
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-navy mb-4">
            What families are saying.
          </h2>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-ivory rounded-xl border border-border p-6 flex flex-col"
            >
              <Quote size={20} className="text-gold/30 mb-3" />
              <p className="text-sm text-navy/80 leading-relaxed flex-1 mb-4">
                {review.text}
              </p>
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-1 mb-1.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className={
                        j < review.rating
                          ? "fill-gold text-gold"
                          : "text-border"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm font-semibold text-navy">{review.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-warm-grey">{review.product}</p>
                  {review.verified && (
                    <span className="text-xs text-success font-medium">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
