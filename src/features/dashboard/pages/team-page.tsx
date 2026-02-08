import { Plus, Sparkles, UserRound } from 'lucide-react';
import React from 'react'

function TeamPage() {
  return (
    <main className="">
      <section className="flex max-w-[820px] flex-col items-center text-center">
        <div className="relative mb-8 mt-4 h-[140px] w-[140px] rounded-full border border-dashed border-[#ef6ca8] bg-[#f7c9de]">
          <button className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-white shadow">
            <Plus className="h-4 w-4" />
          </button>
          <div className="absolute -left-5 top-1 grid h-8 w-8 place-items-center rounded-full bg-[#ef5a9a] text-white">
            <UserRound className="h-4 w-4" />
          </div>
          <div className="absolute -bottom-3 -right-5 grid h-8 w-8 place-items-center rounded-full bg-[#ef5a9a] text-white">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-semibold">No Team Yet</h2>
        <p className="max-w-[600px] text-[14px] text-[#4f4f4f]">
          create your team, invite collaborators, and supercharge your workflows
          automation together.
        </p>

        <button className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#ef6ca8] px-6 py-2.5 text-[14px] font-semibold text-white">
          <Plus className="h-4 w-4" />
          create your team
        </button>
      </section>
    </main>
  );
}

export default TeamPage