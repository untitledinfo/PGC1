import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  return (
    <>
      <Header variant="home" activeKey="home" />

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-bg"></div>
          <div className="particles" aria-hidden="true"></div>
          <div className="hero-content reveal">
            <div className="eyebrow">
              <span></span> Pakistan gamers community
            </div>
            <h1>
              Pakistan Gamers <br />
              <em>Community</em>
            </h1>
            <p>
              Join thousands of Pakistani gamers in tournaments, Warrior Lifesteal
              SMP, exclusive events, giveaways, and a community that never logs
              off.
            </p>
            <div className="hero-actions">
              <a className="btn btn-blue" href="#discord">
                <svg>
                  <use href="#i-discord" />
                </svg>{" "}
                Join Discord
              </a>
              <button className="btn btn-ghost" data-modal="event">
                Register for Event
              </button>
              <a className="text-link" href="#server">
                Play now <span>→</span>
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatars">
                <i>AH</i>
                <i>ZM</i>
                <i>SK</i>
                <i>+</i>
              </div>
              <div>
                <b>936+</b>
                <small>gamers already inside</small>
              </div>
            </div>
          </div>
          <div className="hero-side reveal delay">
            <span className="vertical-label">WARRIOR NETWORK</span>
            <div className="status-pill" data-status-pill>
              <i data-status-dot></i>
              <span>
                <small>SERVER STATUS</small>
                <b data-status-text>Checking…</b>
              </span>
            </div>
          </div>
          <a className="scroll-cue" href="#announcement">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
        </section>

        <section className="announcement" id="announcement">
          <div className="announcement-head">
            <span className="live-dot"></span>
            <div>
              <b>REGISTRATION OPEN</b>
              <p>Sunday Minecraft Tournament</p>
            </div>
          </div>
          <div className="prizes">
            <div className="prizes-track">
              <span>
                <i className="rank rank-1">🥇</i>
                <b>Rs. 10,000</b> Cash prize
              </span>
              <span>
                <i className="rank rank-2">🥈</i>
                <b>Gaming Headset</b> Runner-up
              </span>
              <span>
                <i className="rank rank-3">🥉</i>
                <b>Premium Account</b> Third place
              </span>
              <span>
                <i className="rank rank-1">🥇</i>
                <b>Rs. 10,000</b> Cash prize
              </span>
              <span>
                <i className="rank rank-2">🥈</i>
                <b>Gaming Headset</b> Runner-up
              </span>
              <span>
                <i className="rank rank-3">🥉</i>
                <b>Premium Account</b> Third place
              </span>
            </div>
          </div>
          <div className="mini-countdown" data-countdown>
            <span>
              <b data-days>06</b>DAYS
            </span>
            <i>:</i>
            <span>
              <b data-hours>18</b>HRS
            </span>
            <i>:</i>
            <span>
              <b data-minutes>42</b>MIN
            </span>
          </div>
          <button className="btn btn-white btn-sm" data-modal="event">
            Register now →
          </button>
        </section>

        <section className="section event-section" id="event">
          <div className="section-head reveal">
            <div>
              <span className="kicker">NEXT BIG EVENT</span>
              <h2>
                SUNDAY MINECRAFT
                <br />
                <em>TOURNAMENT</em>
              </h2>
            </div>
            <p>
              Battle Pakistan&apos;s sharpest players in a high-stakes survival
              showdown. One arena. One champion. Real prizes.
            </p>
          </div>
          <div className="event-grid reveal">
            <article className="event-main">
              <div className="event-art">
                <img
                  className="event-art-img"
                  src="/event-crafter.jpg"
                  alt="The Last Crafter Standing tournament arena"
                  loading="lazy"
                />
                <div className="event-art-overlay"></div>
                <div className="event-art-glow"></div>
                <div className="date-chip">
                  <b>07</b>
                  <span>
                    JUL
                    <br />
                    SUN
                  </span>
                </div>
                <span className="tag">SOLO • SURVIVAL</span>
                <div className="trophy">♛</div>
              </div>
              <div className="event-copy">
                <span className="status-open">
                  <i></i> 65 SPOTS REMAINING
                </span>
                <h3>
                  THE LAST CRAFTER
                  <br />
                  STANDING
                </h3>
                <p>
                  Survive the elements, outplay your rivals and be the final
                  player standing in our custom-built arena.
                </p>
                <div className="event-meta">
                  <span>
                    <small>PRIZE POOL</small>
                    <b>Rs. 10,000</b>
                  </span>
                  <span>
                    <small>STARTS AT</small>
                    <b>12:00 PM PKT</b>
                  </span>
                  <span>
                    <small>ENTRY</small>
                    <b>Free</b>
                  </span>
                </div>
                <div className="button-row">
                  <button className="btn btn-blue" data-modal="event">
                    Secure your spot →
                  </button>
                  <button className="btn btn-ghost" data-modal="rules">
                    View rules
                  </button>
                </div>
              </div>
            </article>
            <aside className="champions" id="leaderboard">
              <span className="kicker">HALL OF FAME</span>
              <h3>PAST CHAMPIONS</h3>
              <div className="champ">
                <b>01</b>
                <span className="champ-photo">
                  <img
                    src="/assets/champion-1.webp"
                    data-name="DarkFlamez"
                    alt="DarkFlamez — July champion"
                    loading="lazy"
                  />
                </span>
                <span className="champ-info">
                  <strong title="DarkFlamez">DarkFlamez</strong>
                  <small>July Champion</small>
                </span>
                <em>Rs. 10K</em>
              </div>
              <div className="champ">
                <b>02</b>
                <span className="champ-photo">
                  <img
                    src="/assets/champion-2.webp"
                    data-name="MrElevenXD"
                    alt="MrElevenXD — July champion"
                    loading="lazy"
                  />
                </span>
                <span className="champ-info">
                  <strong title="MrElevenXD">MrElevenXD</strong>
                  <small>July Champion</small>
                </span>
                <em>Minecraft Premium</em>
              </div>
              <div className="champ">
                <b>03</b>
                <span className="champ-photo">
                  <img
                    src="/assets/champion-3.webp"
                    data-name="Unknown"
                    alt="Unknown — July champion"
                    loading="lazy"
                  />
                </span>
                <span className="champ-info">
                  <strong title="Unknown">Unknown</strong>
                  <small>July Champion</small>
                </span>
                <em>N/A</em>
              </div>
              <a className="text-link" href="#leaderboard">
                View full leaderboard →
              </a>
            </aside>
          </div>
        </section>

        <section className="section server" id="server">
          <div className="server-glow"></div>
          <div className="server-intro reveal">
            <span className="kicker">PGC EXCLUSIVE SERVER</span>
            <h2>
              WARRIOR
              <br />
              <em>LIFESTEAL</em> SMP
            </h2>
            <p>
              Every fight matters. Every heart counts. Build your legacy in
              Pakistan&apos;s most competitive crossplay survival world.
            </p>
            <div className="server-numbers" data-server-status>
              <div>
                <span className="pulse" data-status-dot></span>
                <b data-status-label>CHECKING</b>
              </div>
              <div>
                <strong data-server-count>—</strong>
                <small>PLAYERS</small>
              </div>
              <div>
                <strong data-server-ping>—</strong>
                <small>PING</small>
              </div>
            </div>
            <div className="player-bar" data-player-bar hidden>
              <div className="player-bar-track">
                <div className="player-bar-fill" data-player-bar-fill></div>
              </div>
              <div className="player-bar-label">
                <span>SLOTS FILLED</span>
                <b data-player-bar-label>— / —</b>
              </div>
            </div>
          </div>
          <div className="server-panel reveal delay">
            <div className="panel-tabs">
              <button className="active" data-edition="java">
                JAVA EDITION
              </button>
              <button data-edition="bedrock">BEDROCK</button>
            </div>
            <span className="panel-label">SERVER ADDRESS</span>
            <div className="ip-box">
              <div>
                <small>IP ADDRESS</small>
                <b data-ip>play.pgcmc.fun</b>
              </div>
              <div>
                <small>PORT</small>
                <b data-port>25568</b>
              </div>
              <button className="copy" data-copy aria-label="Copy server address">
                <svg>
                  <use href="#i-copy" />
                </svg>
              </button>
            </div>
            <button className="btn btn-blue btn-wide" data-copy>
              Copy IP &amp; Start Playing
            </button>
            <p className="panel-note">
              Supports Minecraft 1.20+ • Java &amp; Bedrock crossplay
            </p>
          </div>
          <div className="feature-strip reveal">
            <div>
              <span>♥</span>
              <b>STEAL HEARTS</b>
              <small>Defeat players, gain power</small>
            </div>
            <div>
              <span>⚔</span>
              <b>INTENSE PVP</b>
              <small>Skill-based combat</small>
            </div>
            <div>
              <span>⬡</span>
              <b>CUSTOM CRATES</b>
              <small>Exclusive weekly loot</small>
            </div>
            <div>
              <span>⌂</span>
              <b>BUILD BASES</b>
              <small>Create your stronghold</small>
            </div>
            <div>
              <span>↻</span>
              <b>WEEKLY UPDATES</b>
              <small>Fresh content, always</small>
            </div>
          </div>
        </section>

        <section className="section team" id="team">
          <div className="section-head reveal">
            <div>
              <span className="kicker">THE PEOPLE BEHIND PGC</span>
              <h2>
                MEET THE
                <br />
                <em>TEAM</em>
              </h2>
            </div>
            <p>
              Six people keeping the servers online, the community fair, and PGC
              looking this good.
            </p>
          </div>
          <div className="team-grid reveal">
            <article className="team-card">
              <div className="team-photo">
                <img
                  src="/assets/images.jfif"
                  data-name="Owner"
                  alt="Owner — PGC Founder"
                  loading="lazy"
                />
              </div>
              <span className="team-tag" data-tag="owner">
                Owner
              </span>
              <div className="team-info">
                <h3>Farhané Bluetick</h3>
                <span className="team-title">Founder &amp; Owner</span>
              </div>
            </article>
            <article className="team-card">
              <div className="team-photo">
                <img
                  src="/assets/panther.webp"
                  data-name="Co-Owner"
                  alt="Co-Owner — PGC"
                  loading="lazy"
                />
              </div>
              <span className="team-tag" data-tag="co-owner">
                Co-Owner
              </span>
              <div className="team-info">
                <h3>PantherBoy22</h3>
                <span className="team-title">Co-Owner</span>
              </div>
            </article>
            <article className="team-card">
              <div className="team-photo">
                <img
                  src="/assets/p1.webp"
                  data-name="Lead Developer"
                  alt="Lead Developer — PGC"
                  loading="lazy"
                />
              </div>
              <span className="team-tag" data-tag="developer">
                Co-Owner
              </span>
              <div className="team-info">
                <h3>MALAK TOAST</h3>
                <span className="team-title">Co-Owner</span>
              </div>
            </article>
            <article className="team-card">
              <div className="team-photo">
                <img
                  src="/assets/p2.png"
                  data-name="Developer"
                  alt="Developer — PGC"
                  loading="lazy"
                />
              </div>
              <span className="team-tag" data-tag="developer">
                Supreme Commander
              </span>
              <div className="team-info">
                <h3>SAJJAD DEV</h3>
                <span className="team-title">Supreme Commander</span>
              </div>
            </article>
            <article className="team-card">
              <div className="team-photo">
                <img
                  src="/assets/1.webp"
                  data-name="Design and Animation"
                  alt="Design & Animation Lead — PGC"
                  loading="lazy"
                />
              </div>
              <span className="team-tag" data-tag="design">
                Supreme Commander
              </span>
              <div className="team-info">
                <h3>Sky</h3>
                <span className="team-title">Supreme Commander</span>
              </div>
            </article>
            <article className="team-card">
              <div className="team-photo">
                <img
                  src="/assets/p3.webp"
                  data-name="Community Manager"
                  alt="Community Manager — PGC"
                  loading="lazy"
                />
              </div>
              <span className="team-tag" data-tag="staff">
                High Command
              </span>
              <div className="team-info">
                <h3>Fearless Warrior</h3>
                <span className="team-title">High Command</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section applications" id="applications">
          <div className="section-head reveal">
            <div>
              <span className="kicker">BUILD WITH US</span>
              <h2>
                FIND YOUR PLACE
                <br />
                <em>IN THE TEAM</em>
              </h2>
            </div>
            <p>
              PGC is built by passionate people. Bring your talent, shape the
              community, and level up with us.
            </p>
          </div>
          <div className="app-grid reveal">
            <article className="app-card blue">
              <span className="app-num">01</span>
              <svg>
                <use href="#i-shield" />
              </svg>
              <h3>STAFF TEAM</h3>
              <p>Keep the community fair, welcoming and alive.</p>
              <ul>
                <li>Age 13+ &amp; active voice chat</li>
                <li>Moderator &amp; Discord management</li>
                <li>Graphic and creative design</li>
              </ul>
              <button className="text-link" data-modal="staff">
                Apply for staff →
              </button>
            </article>
            <article className="app-card">
              <span className="app-num">02</span>
              <svg>
                <use href="#i-code" />
              </svg>
              <h3>DEVELOPERS</h3>
              <p>Build the systems that power the PGC experience.</p>
              <ul>
                <li>Java, plugins &amp; Skript</li>
                <li>Configuration &amp; optimization</li>
                <li>Testing, teamwork &amp; craft</li>
              </ul>
              <button className="text-link" data-modal="developer">
                Apply as developer →
              </button>
            </article>
            <article className="app-card">
              <span className="app-num">03</span>
              <svg>
                <use href="#i-video" />
              </svg>
              <h3>CREATOR PROGRAM</h3>
              <p>Turn your audience into something unforgettable.</p>
              <ul>
                <li>Verified creator role</li>
                <li>Exclusive events &amp; support</li>
                <li>Community-wide promotion</li>
              </ul>
              <button className="text-link" data-modal="creator">
                Join creator program →
              </button>
            </article>
          </div>
        </section>

        <section className="stats" id="community">
          <div className="stat reveal">
            <b id="statDiscordMembers" data-counter="936">
              0
            </b>
            <span>DISCORD MEMBERS</span>
          </div>
          <div className="stat reveal">
            <b data-counter="535">0</b>
            <span>UNIQUE PLAYERS</span>
          </div>
          <div className="stat reveal">
            <b data-counter="145">0</b>
            <span>EVENTS HOSTED</span>
          </div>
          <div className="stat reveal">
            <b data-counter="15000" data-prefix="Rs. ">
              0
            </b>
            <span>PRIZES GIVEN</span>
          </div>
        </section>

        <section className="section features">
          <div className="center-head reveal">
            <span className="kicker">BUILT DIFFERENT</span>
            <h2>
              EVERYTHING YOU NEED
              <br />
              <em>TO PLAY YOUR WAY</em>
            </h2>
          </div>
          <div className="feature-grid reveal">
            <div>
              <svg>
                <use href="#i-puzzle" />
              </svg>
              <b>CUSTOM PLUGINS</b>
              <p>Original systems built for PGC.</p>
            </div>
            <div>
              <svg>
                <use href="#i-zap" />
              </svg>
              <b>FAST SERVERS</b>
              <p>Low latency across Pakistan.</p>
            </div>
            <div>
              <svg>
                <use href="#i-shield" />
              </svg>
              <b>DDOS PROTECTION</b>
              <p>Enterprise-grade protection.</p>
            </div>
            <div>
              <svg>
                <use href="#i-users" />
              </svg>
              <b>FRIENDLY COMMUNITY</b>
              <p>A place where everyone belongs.</p>
            </div>
            <div>
              <svg>
                <use href="#i-phone" />
              </svg>
              <b>CROSSPLAY</b>
              <p>Java and Bedrock together.</p>
            </div>
            <div>
              <svg>
                <use href="#i-trophy" />
              </svg>
              <b>LEADERBOARDS</b>
              <p>Prove it. Climb the ranks.</p>
            </div>
          </div>
        </section>

        <section className="section gallery" id="gallery">
          <div className="section-head reveal">
            <div>
              <span className="kicker">FROM THE COMMUNITY</span>
              <h2>
                PGC IN <em>ACTION</em>
              </h2>
            </div>
            <div className="filter-row">
              <button className="active" data-filter="all">
                All
              </button>
              <button data-filter="events">Events</button>
              <button data-filter="builds">Builds</button>
              <button data-filter="community">Community</button>
            </div>
          </div>
          <div className="gallery-grid reveal">
            <button
              className="gallery-item tall"
              data-type="builds"
              aria-label="Open Warrior castle image"
            >
              <img src="/unnamed-1.webp" alt="Farhan Bluetick Profile" loading="lazy" />
              <span>
                Farhan Bluetick<small>Contact Creator</small>
              </span>
            </button>
            <button
              className="gallery-item arena"
              data-type="events"
              aria-label="Open PvP finals image"
            >
              <img src="/1.webp" alt="GIVEWAY WINNER" loading="lazy" />
              <span>
                GIVEWAY <small> Winner</small>
              </span>
            </button>
            <button
              className="gallery-item portal"
              data-type="builds"
              aria-label="Open portal district image"
            >
              <img src="/2.webp" alt="EVENT INFO" loading="lazy" />
              <span>
                EVENT <small> About </small>
              </span>
            </button>
            <button
              className="gallery-item squad"
              data-type="community"
              aria-label="Open community night image"
            >
              <img src="/3.webp" alt="PS5 & Games" loading="lazy" />
              <span>
                PS5 &amp; Games<small>Daily Events!</small>
              </span>
            </button>
            <button
              className="gallery-item squad"
              data-type="community"
              aria-label="Open community night image"
            >
              <img src="/4.webp" alt="PS5 & Games" loading="lazy" />
              <span>
                Winner<small>Staff Gift</small>
              </span>
            </button>
            <button
              className="gallery-item arena"
              data-type="events"
              aria-label="Open PvP finals image"
            >
              <img src="/1.png" alt="10,000" loading="lazy" />
              <span>
                GIVEWAY <small> Winner</small>
              </span>
            </button>
          </div>
        </section>

        <section className="section testimonials">
          <div className="center-head reveal">
            <span className="kicker">PLAYER STORIES</span>
            <h2>
              THE COMMUNITY <em>SPEAKS</em>
            </h2>
          </div>
          <div className="quotes reveal">
            <article>
              <div className="stars">★★★★★</div>
              <blockquote>
                &ldquo;PGC turned Minecraft from a game into a place I genuinely
                look forward to returning to.&rdquo;
              </blockquote>
              <footer>
                <i>AA</i>
                <span>
                  <b>Ali Ahmed</b>
                  <small>Member since 2022</small>
                </span>
              </footer>
            </article>
            <article className="featured">
              <div className="stars">★★★★★</div>
              <blockquote>
                &ldquo;Yes, I have received the game Thank you so much Panther Boy
                and Thank you so much Farhan Blueick Thank you&rdquo;
              </blockquote>
              <footer>
                <i>ME</i>
                <span>
                  <b>MrElevenXD</b>
                  <small>Tournament Champion</small>
                </span>
              </footer>
            </article>
            <article>
              <div className="stars">★★★★★</div>
              <blockquote>
                &ldquo;A rare server where the staff listens, updates feel
                meaningful, and the community actually helps.&rdquo;
              </blockquote>
              <footer>
                <i>SR</i>
                <span>
                  <b>Sarah R.</b>
                  <small>Warrior SMP Player</small>
                </span>
              </footer>
            </article>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="faq-intro reveal">
            <span className="kicker">NEED TO KNOW</span>
            <h2>
              FREQUENTLY
              <br />
              <em>ASKED</em>
            </h2>
            <p>Still stuck? Our support team is one Discord message away.</p>
            <a className="btn btn-ghost" href="#discord">
              Get support →
            </a>
          </div>
          <div className="faq reveal">
            <details open>
              <summary>
                How do I join the Minecraft server?<span>+</span>
              </summary>
              <p>
                Open Minecraft 1.20 or newer, add <b>play.pgcmc.fun</b> to your
                server list, and connect using the Java or Bedrock port shown
                above.
              </p>
            </details>
            <details>
              <summary>
                How do I register for an event?<span>+</span>
              </summary>
              <p>
                Use any Register button on this page, submit your in-game name
                and Discord ID, then watch Discord for confirmation.
              </p>
            </details>
            <details>
              <summary>
                Can cracked Minecraft accounts join?<span>+</span>
              </summary>
              <p>
                Account eligibility varies by season. Check the current server
                rules in Discord before joining.
              </p>
            </details>
            <details>
              <summary>
                What are the server rules?<span>+</span>
              </summary>
              <p>
                No cheating, exploiting, hate speech or targeted harassment.
                Competitive play is encouraged; toxic behaviour is not.
              </p>
            </details>
            <details>
              <summary>
                How do I apply for staff or creator roles?<span>+</span>
              </summary>
              <p>
                Choose your program above and complete the short application. We
                review applications weekly.
              </p>
            </details>
          </div>
        </section>

        <section className="discord" id="discord">
          <div className="discord-orb">
            <img src="/logo.png" alt="PGC logo" />
          </div>
          <div className="reveal">
            <span className="kicker">THE CONVERSATION NEVER STOPS</span>
            <h2>
              YOUR NEXT SQUAD
              <br />
              IS <em>WAITING.</em>
            </h2>
            <p>
              Tournaments, giveaways, support, updates, voice chat—and thousands
              of Pakistani gamers who get it.
            </p>
            <a
              className="btn btn-white"
              href="https://discord.gg/qnHJZddjTW"
              target="_blank"
              rel="noreferrer"
            >
              <svg>
                <use href="#i-discord" />
              </svg>{" "}
              Join the PGC Discord ↗
            </a>
          </div>
          <div className="discord-widget reveal" id="discordWidget">
            <div className="widget-head">
              <div>
                <span className="live-dot" id="discordLiveDot"></span>
                <b>PAKISTAN GAMERS COMMUNITY</b>
              </div>
              <small>discord.gg/qnHJZddjTW</small>
            </div>
            <div className="widget-stats">
              <span>
                <b id="widgetMemberCount">–</b>
                <small>MEMBERS</small>
              </span>
              <span>
                <b id="widgetOnlineCount">–</b>
                <small>ONLINE NOW</small>
              </span>
            </div>
            <div className="online-list" id="onlineList">
              <span>
                <i></i>Loading live members <small>Connecting to Discord…</small>
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="home" />

      <div className="search-overlay" aria-hidden="true">
        <button className="search-close" aria-label="Close search">
          ×
        </button>
        <form>
          <label htmlFor="site-search">SEARCH PGC</label>
          <input
            id="site-search"
            type="search"
            placeholder="Events, server, applications…"
            autoComplete="off"
          />
          <div className="search-results"></div>
        </form>
      </div>
      <dialog className="modal">
        <button className="modal-close" aria-label="Close">
          ×
        </button>
        <div className="modal-body"></div>
      </dialog>
      <dialog className="lightbox">
        <button className="modal-close" aria-label="Close">
          ×
        </button>
        <div className="lightbox-image"></div>
        <h3></h3>
      </dialog>

      <HomeClient />
    </>
  );
}
