"use client";

import { useState } from "react";

type OfferButtonProps = {
  listingId: string;
  listingTitle: string;
  agentEmail: string;
  price: number;
};

export function OfferButton({ listingId, listingTitle, agentEmail, price }: OfferButtonProps) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [offerPrice, setOfferPrice] = useState(price);

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-semibold text-emerald-400">
        ✓ Offer sent!
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-orange-500/40 bg-orange-500/10 px-4 py-2.5 text-sm font-bold text-orange-400 transition hover:bg-orange-500/20"
      >
        💰 Make an Offer
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 md:items-center">
          <div className="w-full max-w-md rounded-3xl border border-[#2A2A2A] bg-[#111111] p-6">
            <h3 className="mb-1 text-xl font-black text-white">Make an Offer</h3>
            <p className="mb-5 text-sm text-[#888]">{listingTitle}</p>

            <form
              action="https://formsubmit.co/admin+v1@grab3.com"
              method="POST"
              onSubmit={() => { setSent(true); setOpen(false); }}
              className="space-y-3"
            >
              <input type="hidden" name="_subject" value={`Rental Offer — ${listingTitle} (${listingId})`} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://rentbuzz.com.au/thanks" />
              <input type="hidden" name="listing_id" value={listingId} />
              <input type="hidden" name="agent_email" value={agentEmail} />

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#777]">Your offered rent ($/wk)</label>
                <input
                  type="number"
                  name="offer_price"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  min={100}
                  max={5000}
                  step={10}
                  required
                  className="w-full rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3 text-lg font-bold text-orange-400 focus:border-orange-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#555]">Listed at ${price}/wk</p>
              </div>

              <input type="text" name="name" placeholder="Your name" required className="w-full rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-orange-500 focus:outline-none" />
              <input type="email" name="email" placeholder="Your email" required className="w-full rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-orange-500 focus:outline-none" />
              <input type="tel" name="phone" placeholder="Phone (optional)" className="w-full rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-orange-500 focus:outline-none" />
              <textarea name="message" rows={3} placeholder="Move-in date, any conditions (e.g. pets, lease length)" className="w-full rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-orange-500 focus:outline-none" />

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-2xl border border-[#2A2A2A] py-3 text-sm font-semibold text-[#888] hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-2xl bg-orange-500 py-3 text-sm font-bold text-black hover:bg-orange-400">
                  Send Offer →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
