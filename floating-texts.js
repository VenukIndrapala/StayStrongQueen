(function () {
  const sentences = [
  "Her cute face she makes when she tries to be angry",
  "Her little physical touches that she gives without her knowing",
  "Her downward smile",
  "Her upward smile",
  "Her smile",
  "Her laughing from the heart",
  "Her grin when she hears that she's the cutest princess I know and the only princess I know",
  "Her starting letter being the center of my middle letter",
  "Her forgetting 99% of everything but remembering the 1% that's most important to me",
  "Her cute little bites when she eats",
  "Her hiding her face behind me when she's embarrassed.",
  "Her shoulders touching mine",
  "Her acting tough but irl the sweetest soul to exist.",
  "Her cuteness being the only cuteness that makes me smile.",
  "Her being locked in with anything she does.",
  "Her being able to stand out for me no matter how big the crowd.",
  "Her \"good morning\" notification always making my day.",
  "Her being comfortable to be with at anytime anyplace or any moment",
  "Her walking only in patterns on sidewalks.",
  "Her \"hehe\" text",
  "Her interest in fishies",
  "Her having the softest and sweetest voice that's pleasant to hear.",
  "Her matching her watch color with her outfit.",
  "Her expression for things she's interested in",
  "Her hands being cold.",
  "Her realizing she's wrong but not accepting it.",
  "Her being my favorite germaphobe",
  "Her being annoyed with me.",
  "Her small random drawings",
  "Her being patient when teaching me about something over and over again.",
  "Her appreciating the little things.",
  "Her stuffy nose",
  "Her having two ways to spell her name and both sounding really cool.",
  "Her being close with her family.",
  "Her trying to lift heavy things",
  "Her saying the word \"mhmm\"",
  "Her facing any problem that comes her way without saying no.",
  "Her trying to touch her nose with her tongue.",
  "Her being my favorite Omi and carom partner.",
  "Her Nails",
  "Her chugging the morning tea.",
  "Her scolding me about the funny things I do.",
  "Her cringing her way through my games but always appreciating them.",
  "Her wrapping her arm around mine.",
  "Her dilly dallying pose.",
  "Her annoyed expressions.",
  "Her whispering anything to my ear.",
  "Her mountain biceps.",
  "Her primemarkk reels.",
  "Her LinkedIn games comeback.",
  "Her outfit ideas",
  "Her tiny sneezes",
  "Her wholesome side eye",
  "Her wearing her spectacles",
  "Her drawing on my nails during that one management tutorial.",
  "Her dance moves.",
  "Her holding me with her tiny little hands.",
  "Her speaking in Tamil.",
  "Her only taking up 1/4th of her bed.",
  "Her shorts with different beach item prints.",
  "Her cuddling up inside her bedsheets when it's cold.",
  "Her pushing herself to finish the water quota of the day.",
  "Her fake laugh that she got from who knows.",
  "Her saying the word parota and puttu.",
  "Her trusting what she believes in.",
  "Her toe that has been split in half.",
  "Her coming to my mind when i see the dehiwala \"Highway\".",
  "Her messy hair when she's knocked out.",
  "Her video notes.",
  "Her letting me open any door for Her.",
  "Her picking the opposite of what i pick, even though what i pick is what she wants.",
  "Her voice when she tries to mimic someone.",
  "Her always being able to win even when she looses.",
  "Her holding Her stomach and trying to act okay when its clear she's getting cooked.",
  "Her little daily updates she gives throughout the day.",
  "Her when drinking a milo.",
  "Her reducing the budget every time i do a funny.",
  "Her scolding me while appreciating whatever bare minimum i just did.",
  "Her soft side.",
  "Her complaining.",
  "Her helping me to meet new people.",
  "Her love for carrots.",
  "Her giving me the best outfit ideas.",
  "Her forgetting what she said two minutes ago.",
  "Her obsession with haaland.",
  "Her being the first person i notify when something happens.",
  "Her falling asleep.",
  "Her loving now you see me but still hasn't watched it.",
  "Her social media posts.",
  "Her introducing me to Yudheesh and Debborah.",
  "Her song recommendations.",
  "Her being Herself during yf sessions.",
  "Her love for spinning chairs.",
  "Her eating healthy even though she eats less.",
  "Her love for God.",
  "Her video calls.",
  "Her being the only person to make me want to reply in milliseconds.",
  "Her exquisite taste pallet.",
  "Her running Her hands through my hair.",
  "And finally it's about her being the only person that I can't describe with only a 100 reasons cause I'll need a lot more."
];

  const layer = document.createElement("div");
  layer.id = "floating-text-layer";
  document.body.appendChild(layer);

  function spawn(text) {
    const el = document.createElement("div");
    el.className = "floating-text";
    el.textContent = text;

    // Adjusted safe zone bounds (18% to 82%) to prevent edge clipping on mobile
    const leftPct = 18 + Math.random() * 64; 
    const bottomVh = 6 + Math.random() * 4; 
    const driftPx = Math.random() * 60 - 30; 
    const duration = 16 + Math.random() * 7; 
    
    // Scaled down font size for better mobile fit
    const fontRem = 0.68 + Math.random() * 0.18;

    el.style.left = leftPct + "%";
    el.style.bottom = bottomVh + "vh";
    el.style.fontSize = fontRem + "rem";
    el.style.setProperty("--drift", driftPx + "px");
    el.style.animationDuration = duration + "s";

    layer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }

  function start() {
    let i = 0;
    function next() {
      if (i >= sentences.length) return;
      spawn(sentences[i]);
      i++;
      const delay = 3200 + Math.random() * 1600; 
      setTimeout(next, delay);
    }
    next();
  }

  setTimeout(start, 5000);
})();
