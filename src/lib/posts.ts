export interface Post {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
}

export const posts: Post[] = [
  {
    slug: "post-1",
    date: "June 28, 2026",
    title: "Warrior Lifesteal SMP Season 2 Is Live",
    excerpt:
      "New map, new crates, and a fresh heart economy — Season 2 of Warrior Lifesteal SMP has officially launched on Java and Bedrock.",
    bodyHtml: `
      <p>After three weeks of testing, <b>Season 2</b> of the Warrior Lifesteal SMP is officially open to everyone. Here's everything that changed.</p>
      <h2>What's new</h2>
      <ul>
        <li><b>Fresh world</b> — a brand new map generated from scratch, so everyone starts on equal footing.</li>
        <li><b>Rebalanced heart economy</b> — losing a fight now costs one heart instead of two, making comebacks realistic.</li>
        <li><b>Custom crates</b> — weekly crates with new cosmetic kits, name tags and rare tools.</li>
        <li><b>Crossplay</b> — Java and Bedrock players share the same world and economy.</li>
      </ul>
      <h2>How to join</h2>
      <p>Add <code>play.pgcmc.fun</code> to your server list in Minecraft 1.20 or newer. Full connection details, including the current port, are on the <a href="/#server">server panel</a>.</p>
      <h2>Season 1 recap</h2>
      <p>Season 1 ran for just over two months and crowned five champions, who now have their names permanently on the leaderboard. Thank you to everyone who played — the feedback from that season is the reason Season 2 looks the way it does.</p>
      <blockquote>"The new heart economy makes every fight matter without feeling punishing." — a Season 1 finalist</blockquote>
      <p>See you in the arena.</p>
    `,
  },
  {
    slug: "post-2",
    date: "June 15, 2026",
    title: "Staff & Creator Applications Are Now Open",
    excerpt:
      "PGC is growing, and we're looking for moderators, developers and creators to help shape what comes next.",
    bodyHtml: `
      <p>PGC has grown a lot over the last few months, and it's time to grow the team with it. Applications are now open for three programs.</p>
      <h2>Staff Team</h2>
      <p>We're looking for people who can keep the community fair, welcoming and alive — moderating chat and voice, and helping run events. You'll need to be 13 or older and active in voice chat.</p>
      <h2>Developers</h2>
      <p>If you know Java, plugins or Skript, we'd love your help building the systems that power the PGC experience — from crate logic to the heart economy itself.</p>
      <h2>Creator Program</h2>
      <p>Already making content around PGC? The Creator Program gives verified creators a dedicated role, early access to events, and community-wide promotion.</p>
      <h2>How to apply</h2>
      <p>Head to the <a href="/#applications">Applications section</a> on the homepage and pick the program that fits you. We review applications weekly, and you'll hear back over Discord either way.</p>
      <p>Good luck — we're excited to see who joins the team.</p>
    `,
  },
  {
    slug: "post-3",
    date: "July 4, 2026",
    title: "🏆 PGC Sunday Build Battle Tournament Registration Is NOW OPEN!",
    excerpt:
      "Join the Sunday Build Battle Tournament and compete for Rs. 10,000, an Official Minecraft Account, and Discord Nitro.",
    bodyHtml: `
      <p>The <strong>Pakistan Gamers Community (PGC)</strong> proudly presents the <strong>Sunday Build Battle Tournament</strong>! Put your creativity to the test and compete against the best builders for incredible rewards.</p>
      <h2>🎮 Registration Open</h2>
      <p>Registrations are officially open. Secure your spot now and prepare your best building skills before tournament day.</p>
      <h2>💰 Tournament Prizes</h2>
      <ul>
        <li>🥇 <strong>1st Place:</strong> Rs. 10,000</li>
        <li>🥈 <strong>2nd Place:</strong> Official Minecraft Account</li>
        <li>🥉 <strong>3rd Place:</strong> Discord Nitro</li>
      </ul>
      <h2>⚠️ Tournament Requirement</h2>
      <p>Every participant <strong>MUST</strong> have the official <strong>PGC Tag</strong> before joining.</p>
      <ul>
        <li>✅ PGC Tag Required</li>
        <li>❌ No PGC Tag = No Entry</li>
      </ul>
      <h2>📅 Tournament Schedule</h2>
      <p><strong>Event:</strong> Sunday Build Battle Tournament</p>
      <p>Register now, invite your friends, and show everyone your creativity!</p>
      <p>Good luck to all participants.<br><strong>— PGC Team 🇵🇰</strong></p>
    `,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
