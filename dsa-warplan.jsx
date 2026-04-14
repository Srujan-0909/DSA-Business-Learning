import { useState, useEffect } from "react";

const PHASES = [
  {
    id: 1,
    title: "FOUNDATION SPRINT",
    subtitle: "Build Your Operating System",
    businessIdea: "You can't scale what you can't measure. Before you disrupt anything, wire your brain for pattern recognition.",
    weeks: "Week 1–3",
    modules: [
      {
        name: "Arrays & Hashing",
        concept: "Store fast, retrieve faster. Every billion-dollar company is a database with a UI.",
        time: "~3 min read",
        explanation: `Arrays = ordered shelf. Hash Maps = labeled drawers. Access by index O(1). Hash lookups O(1) avg. Collisions exist — handle them. Two-pointer trick: start from both ends, squeeze inward. Sliding window: fixed/variable frame moving across data. Prefix sums: precompute cumulative totals so range queries are O(1). That's it. Everything else is a remix.`,
        problems: [
          { title: "Inventory Deduplication", desc: "Your warehouse has 10M SKUs with duplicates from 3 merged acquisitions. Return unique SKUs in O(n).", hint: "Hash set." },
          { title: "Revenue Window", desc: "Given daily revenue for 365 days, find the best consecutive 30-day revenue window.", hint: "Sliding window, running sum." },
          { title: "Customer Pair Matching", desc: "Two customers' combined order values must hit a promo threshold. Find all valid pairs from 50K orders.", hint: "Hash map complement lookup." },
          { title: "Stock Profit Maximizer", desc: "Given price history, find the single buy-sell pair that maximizes profit. You can't time-travel.", hint: "Track min so far, compare current - min." },
          { title: "Anagram Product Grouping", desc: "Group product names that are anagrams of each other (e.g., 'listen'/'silent' brand variants).", hint: "Sorted string as hash key." },
          { title: "Subarray Target Revenue", desc: "Find the shortest stretch of consecutive days where revenue hits a target sum.", hint: "Variable sliding window." },
        ],
      },
      {
        name: "Strings & Manipulation",
        concept: "Language is data. Every search bar, chatbot, and NLP product starts here.",
        time: "~2 min read",
        explanation: `Strings are char arrays. Immutable in most languages — edits create new copies. Reversal: two pointers swapping inward. Palindrome check: compare s[i] with s[n-1-i]. Substring search: brute force O(nm), KMP O(n+m) for pattern matching. StringBuilder/join for efficient concatenation. ASCII math: 'a'=97, 'A'=65, '0'=48 — use offsets for fast checks.`,
        problems: [
          { title: "Domain Validator", desc: "Validate 1M user-submitted URLs. Check structure, no consecutive dots, valid TLD format.", hint: "State machine or regex + edge cases." },
          { title: "Search Autocomplete Ranker", desc: "Given partial input and a dictionary of 100K product names, return top 5 prefix matches.", hint: "Sort + binary search or trie." },
          { title: "Log Compression", desc: "Encode repeated server log patterns: 'aaabbc' → 'a3b2c1'. Decode it back.", hint: "Two pointer walk + count." },
          { title: "Plagiarism Detector", desc: "Find the longest common substring between two business proposals.", hint: "DP table or suffix approach." },
        ],
      },
      {
        name: "Stacks & Queues",
        concept: "Every undo button, every print queue, every call center — LIFO and FIFO rule operations.",
        time: "~2 min read",
        explanation: `Stack = LIFO. Push/pop from top. O(1) operations. Use for: undo, matching brackets, backtracking, monotonic sequences. Queue = FIFO. Enqueue rear, dequeue front. Use for: BFS, task scheduling, buffering. Deque = double-ended queue. Both ends O(1). Monotonic stack: maintain increasing/decreasing order — the moment you push something that violates order, pop until it fits.`,
        problems: [
          { title: "Undo System", desc: "Build a text editor's undo/redo stack supporting insert, delete, and bulk operations.", hint: "Two stacks: undo + redo." },
          { title: "Support Ticket Router", desc: "Tickets arrive with priority (1-5). Process highest priority first. Handle 10K tickets/sec.", hint: "Priority queue or sorted structure." },
          { title: "Stock Span Calculator", desc: "For each day's stock price, find how many consecutive previous days had ≤ price.", hint: "Monotonic stack storing indices." },
          { title: "Task Dependency Validator", desc: "Given a build system with dependencies, detect if any circular dependency exists.", hint: "Stack-based DFS cycle detection." },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "PATTERN RECOGNITION",
    subtitle: "See The Matrix",
    businessIdea: "Pattern recognition separates operators from founders. You're learning to see what others can't.",
    weeks: "Week 4–7",
    modules: [
      {
        name: "Linked Lists",
        concept: "Dynamic allocation. When you don't know the size upfront — like a startup's headcount.",
        time: "~2 min read",
        explanation: `Nodes pointing to next nodes. No random access — O(n) to find, O(1) to insert/delete at known position. Singly linked: forward only. Doubly: both directions. Cycle detection: Floyd's tortoise & hare (slow+fast pointer). Reversal: flip pointers iteratively. Merge two sorted lists: compare heads, stitch smaller. Dummy head node avoids edge cases.`,
        problems: [
          { title: "Browser History Navigator", desc: "Implement back/forward navigation with the ability to branch into new paths mid-history.", hint: "Doubly linked list, cut forward on new nav." },
          { title: "Playlist Shuffle Detector", desc: "Detect if a music playlist has been corrupted into an infinite loop.", hint: "Floyd's cycle detection." },
          { title: "Merge Sorted Feeds", desc: "Merge K sorted social media feeds into one timeline, maintaining chronological order.", hint: "Merge two at a time or heap-based merge." },
          { title: "LRU Cache for API Rate Limiter", desc: "Build a cache that evicts least recently used entries. O(1) get and put.", hint: "Hash map + doubly linked list." },
        ],
      },
      {
        name: "Recursion & Backtracking",
        concept: "Try everything, fail fast, retreat, try again. Literally how startups iterate.",
        time: "~3 min read",
        explanation: `Function calls itself with smaller input. Base case stops it. Call stack grows with depth. Backtracking = recursion + undo. Explore a path → if it fails, revert and try next option. Key insight: trust the recursion. Solve for n assuming n-1 is solved. Memoization: cache repeated subproblems to avoid redundant work. Tree recursion branches exponentially — prune early.`,
        problems: [
          { title: "Team Combination Generator", desc: "From 20 employees, generate all possible 5-person project teams.", hint: "Combinations via backtracking, prune when remaining < needed." },
          { title: "Meeting Room Scheduler", desc: "Place N meetings into K rooms with no overlaps. Find if it's possible.", hint: "Backtracking with constraint checking." },
          { title: "Product Bundle Optimizer", desc: "Given items with prices, find all subsets that sum to a promo discount value.", hint: "Subset sum backtracking." },
          { title: "Maze Escape (Warehouse Robot)", desc: "Navigate a grid warehouse from entry to exit, avoiding obstacles. Find all paths.", hint: "DFS with visited tracking + backtrack." },
        ],
      },
      {
        name: "Sorting & Searching",
        concept: "If you can sort it, you can search it. If you can search it, you can optimize it.",
        time: "~3 min read",
        explanation: `Binary search: sorted array, halve search space each step. O(log n). Works on answer space too — not just arrays. Merge sort: divide, sort halves, merge. O(n log n), stable. Quick sort: pick pivot, partition, recurse. O(n log n) avg. Counting/Radix sort: O(n) for bounded integers. Key pattern: "find minimum X such that condition is true" → binary search on answer.`,
        problems: [
          { title: "Salary Percentile Calculator", desc: "Given 1M employee salaries, find the 90th percentile without sorting all of them.", hint: "Quickselect or min-heap of size k." },
          { title: "Shipping Capacity Planner", desc: "Find the minimum truck capacity to deliver all packages within D days.", hint: "Binary search on capacity, simulate greedily." },
          { title: "Competitor Price Undercut", desc: "Given two sorted price lists, find all products where you're more expensive.", hint: "Two-pointer merge comparison." },
          { title: "Event Scheduler Conflict", desc: "Given N meeting intervals, find the minimum rooms needed (peak overlap).", hint: "Sort start/end separately, sweep." },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "SYSTEMS THINKING",
    subtitle: "Architect Like a CTO",
    businessIdea: "Trees, graphs, dynamic programming — these are the blueprints of complex systems. You're designing infrastructure now.",
    weeks: "Week 8–12",
    modules: [
      {
        name: "Trees & BSTs",
        concept: "Hierarchies run the world. Org charts, file systems, decision engines — all trees.",
        time: "~3 min read",
        explanation: `Binary tree: each node ≤ 2 children. BST: left < root < right. Search/insert/delete O(log n) if balanced. Traversals: inorder (sorted), preorder (copy), postorder (delete), level-order (BFS). Height = longest root-to-leaf path. Balanced tree: heights of subtrees differ by ≤ 1. DFS = stack/recursion. BFS = queue. Most tree problems: think recursively — solve for root assuming children are solved.`,
        problems: [
          { title: "Org Chart LCA", desc: "Find the lowest common manager of two employees in a company hierarchy.", hint: "Lowest Common Ancestor — recurse both subtrees." },
          { title: "File System Disk Usage", desc: "Calculate total size of each directory in a nested file system tree.", hint: "Postorder traversal, sum children." },
          { title: "Decision Tree Evaluator", desc: "Given a binary decision tree with conditions at nodes, evaluate an input record.", hint: "Root-to-leaf traversal based on conditions." },
          { title: "Serialize API Response Tree", desc: "Convert a nested JSON config tree to a flat string and reconstruct it.", hint: "Preorder with null markers." },
          { title: "BST Price Range Query", desc: "In a BST of product prices, find all products in range [low, high] efficiently.", hint: "Prune branches outside range." },
        ],
      },
      {
        name: "Graphs",
        concept: "Networks. Social graphs, supply chains, internet routing. The most real-world structure there is.",
        time: "~3 min read",
        explanation: `Nodes + edges. Directed/undirected. Weighted/unweighted. Adjacency list: space-efficient for sparse graphs. BFS: shortest path in unweighted graphs (queue). DFS: explore deep first (stack/recursion). Topological sort: order tasks with dependencies (DAG only). Dijkstra: shortest path with weights (priority queue). Union-Find: group connected components efficiently. Cycle detection: DFS with coloring (white/gray/black).`,
        problems: [
          { title: "Social Network Degrees", desc: "Find shortest connection path between two users in a social graph of 1M users.", hint: "BFS from source to target." },
          { title: "Course Prerequisite Planner", desc: "Given course dependencies, find a valid semester-by-semester schedule.", hint: "Topological sort + level grouping." },
          { title: "Supply Chain Cheapest Route", desc: "Find lowest-cost shipping path between two warehouses across a weighted network.", hint: "Dijkstra's algorithm." },
          { title: "Network Redundancy Checker", desc: "Find all critical connections — edges whose removal disconnects the network.", hint: "Tarjan's bridge-finding algorithm." },
          { title: "Company Merger Groups", desc: "Given acquisition pairs, find how many independent corporate groups exist.", hint: "Union-Find or BFS components." },
        ],
      },
      {
        name: "Dynamic Programming",
        concept: "Don't solve the same problem twice. Cache results. Compound your intelligence like compound interest.",
        time: "~3 min read",
        explanation: `Optimal substructure: optimal solution uses optimal solutions of subproblems. Overlapping subproblems: same subproblem solved multiple times. Top-down: recursion + memoization. Bottom-up: iterative table-filling. Steps: (1) define state, (2) find recurrence relation, (3) set base cases, (4) determine iteration order. Common patterns: knapsack, LCS, LIS, grid paths, interval DP. Space optimization: often only need previous row.`,
        problems: [
          { title: "Investment Portfolio Allocator", desc: "Given N funds with risk/return profiles and a capital limit, maximize returns.", hint: "0/1 Knapsack — funds are items, capital is weight." },
          { title: "Minimum Cost Hiring Plan", desc: "Hire from N candidates across K rounds. Cost changes per round. Minimize total cost for target headcount.", hint: "DP on (round, hired_so_far)." },
          { title: "Feature Rollout Sequencer", desc: "N features with time estimates and dependency chains. Minimize total time to ship all.", hint: "DAG + DP on topological order." },
          { title: "Revenue Maximization with Cooldown", desc: "You can run promotions but need cooldown days between them. Maximize total revenue.", hint: "State machine DP: promo, cooldown, idle." },
          { title: "Edit Distance for Fuzzy Search", desc: "Find minimum edits (insert/delete/replace) to transform one product name to another.", hint: "Classic edit distance DP table." },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "MASTERY & WARFARE",
    subtitle: "Compete at the Highest Level",
    businessIdea: "You don't master DSA by studying. You master it by solving problems that feel impossible — then solving them anyway.",
    weeks: "Week 13–16",
    modules: [
      {
        name: "Heaps & Advanced Structures",
        concept: "Priority systems. When everything is urgent, you need a system that knows what's MOST urgent.",
        time: "~2 min read",
        explanation: `Heap: complete binary tree. Min-heap: parent ≤ children. Max-heap: parent ≥ children. Insert/extract: O(log n). Build heap: O(n). Use for: top-K, median finding, merge K sorted, scheduling. Trie: prefix tree for strings. O(L) insert/search where L = word length. Segment tree: range queries + point updates in O(log n). Fenwick tree: simpler range sums.`,
        problems: [
          { title: "Real-Time Median Revenue", desc: "As daily revenue numbers stream in, output the running median at any point.", hint: "Two heaps: max-heap for lower half, min-heap for upper." },
          { title: "Top K Trending Products", desc: "From a stream of 100M purchase events, maintain the top 10 most bought products.", hint: "Min-heap of size K." },
          { title: "Autocomplete Engine", desc: "Build type-ahead for 500K product names. Return top matches by sales rank as user types.", hint: "Trie with ranked suggestions at each node." },
          { title: "Dynamic Range Sales Query", desc: "Given daily sales, answer 'total sales from day L to day R' with frequent updates.", hint: "Segment tree or Fenwick tree." },
        ],
      },
      {
        name: "Greedy & Advanced Graphs",
        concept: "Sometimes the locally optimal choice IS the globally optimal one. Know when to be greedy.",
        time: "~2 min read",
        explanation: `Greedy: at each step, pick the locally optimal choice. Works when: greedy choice property + optimal substructure. Proof: exchange argument — show swapping any choice for the greedy one doesn't improve things. Interval scheduling: sort by end time, pick non-overlapping. MST: Kruskal's (sort edges + union-find) or Prim's (grow from node with min-heap). A*: Dijkstra + heuristic for informed search.`,
        problems: [
          { title: "Maximum Meetings in One Room", desc: "Schedule the most non-overlapping meetings possible in a single conference room.", hint: "Sort by end time, greedily pick." },
          { title: "Minimum Network Cabling", desc: "Connect N offices with minimum total cable length. Some pairs have direct routes.", hint: "Minimum Spanning Tree." },
          { title: "Delivery Route Optimizer", desc: "A driver has N stops with time windows. Find a valid route minimizing travel.", hint: "Greedy nearest neighbor + constraint check." },
          { title: "Task Deadline Scheduler", desc: "N tasks with deadlines and penalties for missing them. Minimize total penalty.", hint: "Sort by penalty desc, schedule at latest available slot." },
        ],
      },
      {
        name: "Bit Manipulation & Math",
        concept: "The lowest level of computation. When you need raw speed, you think in bits.",
        time: "~2 min read",
        explanation: `AND (&): both 1→1. OR (|): either 1→1. XOR (^): different→1, same→0. NOT (~): flip. Left shift (<<): multiply by 2. Right shift (>>): divide by 2. XOR tricks: a^a=0, a^0=a. Find single unique: XOR all elements. Check bit: n & (1<<k). Set bit: n | (1<<k). Clear bit: n & ~(1<<k). Powers of 2: n & (n-1) == 0. GCD: Euclidean algorithm. Modular arithmetic for large numbers.`,
        problems: [
          { title: "Single Failed Server", desc: "All servers report in pairs except one that crashed. Find it from 1M status codes.", hint: "XOR all codes." },
          { title: "Permission Bitmasking", desc: "Design a role permission system using bitmasks. Support AND/OR/NOT operations on roles.", hint: "Each permission = 1 bit. Combine with OR, check with AND." },
          { title: "Power Set of Features", desc: "Generate all possible feature flag combinations for A/B testing N features.", hint: "Iterate 0 to 2^n - 1, each bit = feature on/off." },
          { title: "Fraud Detection Counter", desc: "Count the number of 1-bits in transaction fingerprints to compute similarity scores.", hint: "Brian Kernighan's: n & (n-1) clears lowest set bit." },
        ],
      },
    ],
  },
];

const RULES = [
  { icon: "⚔️", rule: "No peeking at difficulty ratings. Ever." },
  { icon: "🧠", rule: "Read the concept. Solve the problem. In that order." },
  { icon: "⏱️", rule: "45 min per problem max. If stuck, move on. Return later." },
  { icon: "🔥", rule: "3 problems/day minimum. No exceptions." },
  { icon: "📝", rule: "Write the approach in plain English BEFORE coding." },
  { icon: "🚫", rule: "No YouTube tutorials until you've struggled for 30 min." },
];

export default function DSAWarPlan() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeModule, setActiveModule] = useState(0);
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [showConcept, setShowConcept] = useState(null);
  const [completed, setCompleted] = useState({});
  const [showRules, setShowRules] = useState(true);
  const [view, setView] = useState("plan");

  const toggleComplete = (key) => {
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalProblems = PHASES.reduce((a, p) => a + p.modules.reduce((b, m) => b + m.problems.length, 0), 0);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPct = totalProblems > 0 ? ((completedCount / totalProblems) * 100).toFixed(1) : 0;

  const phase = PHASES[activePhase];
  const mod = phase?.modules[activeModule];

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
      background: "#0a0a0a",
      color: "#e0e0e0",
      minHeight: "100vh",
      padding: "0",
      lineHeight: 1.6,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700;800&family=Space+Grotesk:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        @keyframes glitch { 0%,100%{transform:translate(0)} 20%{transform:translate(-2px,2px)} 40%{transform:translate(2px,-1px)} 60%{transform:translate(-1px,-2px)} 80%{transform:translate(1px,1px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
        .problem-card:hover { border-color: #f59e0b !important; }
        .phase-btn:hover { background: #1a1a1a !important; }
        .mod-btn:hover { background: #1a1a1a !important; border-color: #f59e0b !important; }
      `}</style>

      {/* HEADER */}
      <div style={{
        borderBottom: "1px solid #222",
        padding: "24px 28px",
        background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 5,
              color: "#f59e0b",
              textTransform: "uppercase",
              marginBottom: 4,
            }}>DSA × ENTREPRENEURSHIP</div>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: -0.5,
            }}>THE WAR PLAN</h1>
            <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
              {totalProblems} problems · 16 weeks · no difficulty labels · no mercy
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#f59e0b", fontFamily: "'Space Grotesk', sans-serif" }}>
              {completedCount}/{totalProblems}
            </div>
            <div style={{ fontSize: 10, color: "#666", letterSpacing: 2, textTransform: "uppercase" }}>problems crushed</div>
            <div style={{
              marginTop: 8, height: 4, width: 160, background: "#1a1a1a", borderRadius: 2, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #f59e0b, #ef4444)", borderRadius: 2,
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>
        </div>

        {/* NAV */}
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          <button onClick={() => setView("plan")} style={{
            background: view === "plan" ? "#f59e0b" : "transparent",
            color: view === "plan" ? "#000" : "#666",
            border: "1px solid " + (view === "plan" ? "#f59e0b" : "#333"),
            padding: "6px 16px", borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit", letterSpacing: 1, textTransform: "uppercase",
          }}>Plan</button>
          <button onClick={() => setView("rules")} style={{
            background: view === "rules" ? "#f59e0b" : "transparent",
            color: view === "rules" ? "#000" : "#666",
            border: "1px solid " + (view === "rules" ? "#f59e0b" : "#333"),
            padding: "6px 16px", borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit", letterSpacing: 1, textTransform: "uppercase",
          }}>Rules of Engagement</button>
        </div>
      </div>

      {view === "rules" && (
        <div className="fade-up" style={{ padding: 28, maxWidth: 640 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, color: "#f59e0b", marginBottom: 20 }}>
            RULES OF ENGAGEMENT
          </h2>
          {RULES.map((r, i) => (
            <div key={i} style={{
              display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16,
              padding: "14px 16px", background: "#111", border: "1px solid #1a1a1a", borderRadius: 6,
            }}>
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <span style={{ fontSize: 13, color: "#ccc" }}>{r.rule}</span>
            </div>
          ))}
          <div style={{
            marginTop: 28, padding: 20, background: "#111", border: "1px solid #f59e0b33",
            borderRadius: 6, borderLeft: "3px solid #f59e0b",
          }}>
            <div style={{ fontSize: 13, color: "#f59e0b", fontWeight: 700, marginBottom: 8 }}>THE PHILOSOPHY</div>
            <div style={{ fontSize: 12, color: "#999", lineHeight: 1.8 }}>
              Difficulty labels create a crutch. You skip "hard" problems and coast on "easy" ones.
              In business, nobody labels a problem before handing it to you. You face it, figure out the category,
              and execute. This plan trains that muscle. Every problem here maps to a real system someone built
              and made money from. Solve it like your funding depends on it.
            </div>
          </div>
        </div>
      )}

      {view === "plan" && (
        <div style={{ display: "flex", minHeight: "calc(100vh - 140px)" }}>
          {/* PHASE SIDEBAR */}
          <div style={{
            width: 220, minWidth: 220, borderRight: "1px solid #1a1a1a", padding: "16px 0",
            background: "#0d0d0d",
          }}>
            {PHASES.map((p, i) => {
              const phaseProblems = p.modules.reduce((a, m) => a + m.problems.length, 0);
              const phaseCompleted = p.modules.reduce((a, m) =>
                a + m.problems.filter((_, pi) => completed[`${p.id}-${m.name}-${pi}`]).length, 0);
              return (
                <button className="phase-btn" key={i} onClick={() => { setActivePhase(i); setActiveModule(0); setExpandedProblem(null); setShowConcept(null); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left", padding: "14px 20px",
                    background: activePhase === i ? "#1a1a1a" : "transparent",
                    border: "none", borderLeft: activePhase === i ? "3px solid #f59e0b" : "3px solid transparent",
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                  }}>
                  <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
                    {p.weeks}
                  </div>
                  <div style={{ fontSize: 13, color: activePhase === i ? "#fff" : "#888", fontWeight: 600, marginTop: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{p.subtitle}</div>
                  <div style={{
                    marginTop: 8, height: 2, background: "#222", borderRadius: 1, overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", width: `${(phaseCompleted / phaseProblems) * 100}%`,
                      background: phaseCompleted === phaseProblems ? "#22c55e" : "#f59e0b",
                      transition: "width 0.3s",
                    }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#555", marginTop: 4 }}>{phaseCompleted}/{phaseProblems} done</div>
                </button>
              );
            })}
          </div>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
            {/* Business Ideology Banner */}
            <div className="fade-up" style={{
              padding: "16px 20px", background: "#111", border: "1px solid #1a1a1a",
              borderRadius: 6, marginBottom: 24, borderLeft: "3px solid #f59e0b",
            }}>
              <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                💡 {phase.title} — {phase.subtitle}
              </div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>{phase.businessIdea}</div>
            </div>

            {/* MODULE TABS */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {phase.modules.map((m, i) => {
                const modDone = m.problems.filter((_, pi) => completed[`${phase.id}-${m.name}-${pi}`]).length;
                return (
                  <button className="mod-btn" key={i} onClick={() => { setActiveModule(i); setExpandedProblem(null); setShowConcept(null); }}
                    style={{
                      padding: "10px 16px", background: activeModule === i ? "#1a1a1a" : "transparent",
                      border: "1px solid " + (activeModule === i ? "#f59e0b" : "#222"),
                      borderRadius: 6, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                    }}>
                    <div style={{ fontSize: 12, color: activeModule === i ? "#fff" : "#888", fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: 9, color: modDone === m.problems.length ? "#22c55e" : "#555", marginTop: 2 }}>
                      {modDone}/{m.problems.length} {modDone === m.problems.length ? "✓" : ""}
                    </div>
                  </button>
                );
              })}
            </div>

            {mod && (
              <div className="fade-up">
                {/* CONCEPT CARD */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", background: "#111", border: "1px solid #1a1a1a",
                    borderRadius: showConcept === mod.name ? "6px 6px 0 0" : 6,
                    cursor: "pointer",
                  }} onClick={() => setShowConcept(showConcept === mod.name ? null : mod.name)}>
                    <div>
                      <div style={{ fontSize: 13, color: "#fff", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                        📖 {mod.name} — The Concept
                      </div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{mod.concept}</div>
                      <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 4 }}>{mod.time}</div>
                    </div>
                    <div style={{ fontSize: 18, color: "#555", transform: showConcept === mod.name ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</div>
                  </div>
                  {showConcept === mod.name && (
                    <div style={{
                      padding: "18px 20px", background: "#0d0d0d", border: "1px solid #1a1a1a", borderTop: "none",
                      borderRadius: "0 0 6px 6px", fontSize: 12, color: "#aaa", lineHeight: 1.9,
                      whiteSpace: "pre-wrap",
                    }}>
                      {mod.explanation}
                    </div>
                  )}
                </div>

                {/* PROBLEMS */}
                <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
                  PROBLEMS — {mod.problems.length} challenges
                </div>
                {mod.problems.map((prob, pi) => {
                  const key = `${phase.id}-${mod.name}-${pi}`;
                  const isExpanded = expandedProblem === key;
                  const isDone = completed[key];
                  return (
                    <div className="problem-card" key={pi} style={{
                      marginBottom: 10, background: "#111", border: "1px solid " + (isDone ? "#22c55e33" : "#1a1a1a"),
                      borderRadius: 6, transition: "all 0.2s", overflow: "hidden",
                    }}>
                      <div style={{
                        display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px", cursor: "pointer",
                      }} onClick={() => setExpandedProblem(isExpanded ? null : key)}>
                        <button onClick={(e) => { e.stopPropagation(); toggleComplete(key); }} style={{
                          width: 22, height: 22, minWidth: 22, borderRadius: 4, border: "2px solid " + (isDone ? "#22c55e" : "#333"),
                          background: isDone ? "#22c55e" : "transparent", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, color: "#000", fontWeight: 700, marginTop: 1,
                        }}>{isDone ? "✓" : ""}</button>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 13, color: isDone ? "#22c55e" : "#e0e0e0", fontWeight: 600,
                            textDecoration: isDone ? "line-through" : "none", fontFamily: "'Space Grotesk', sans-serif",
                          }}>{prob.title}</div>
                          <div style={{ fontSize: 11, color: "#777", marginTop: 4, lineHeight: 1.6 }}>{prob.desc}</div>
                        </div>
                        <div style={{ fontSize: 16, color: "#444", transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</div>
                      </div>
                      {isExpanded && (
                        <div style={{
                          padding: "12px 18px 16px 54px", borderTop: "1px solid #1a1a1a",
                          background: "#0d0d0d",
                        }}>
                          <div style={{ fontSize: 10, color: "#f59e0b", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                            NUDGE (only if stuck 30+ min)
                          </div>
                          <div style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>{prob.hint}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
