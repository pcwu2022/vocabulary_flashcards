const b1_words = [
    "Adapt", "Affect", "Allocate", "Analyze", "Appropriate", "Assume", "Behave", "Calculate", "Capture", "Categorize",
    "Celebrate", "Clarify", "Collaborate", "Combine", "Communicate", "Compromise", "Conclude", "Contribute", "Cooperate", "Critique",
    "Define", "Demonstrate", "Describe", "Determine", "Differentiate", "Discuss", "Distribute", "Empower", "Encourage", "Evaluate",
    "Examine", "Explain", "Explore", "Express", "Facilitate", "Formulate", "Generate", "Identify", "Illustrate", "Improve",
    "Incorporate", "Indicate", "Initiate", "Innovate", "Interact", "Interpret", "Introduce", "Investigate", "Judge", "Justify",
    "Modify", "Navigate", "Observe", "Organize", "Participate", "Perceive", "Persuade", "Predict", "Prioritize", "Produce",
    "Recommend", "Reflect", "Reinforce", "Relate", "Represent", "Respond", "Revise", "Solve", "Specify", "Suggest",
    "Summarize", "Support", "Synthesize", "Teach", "Test", "Translate", "Understand", "Utilize", "Verify", "Weigh",
    "Abundant", "Accessible", "Accurate", "Adaptable", "Adventurous", "Ample", "Analytical", "Appropriate", "Assertive", "Attentive",
    "Authentic", "Balanced", "Capable", "Cautious", "Competent", "Confident", "Considerate", "Conscientious", "Consistent", "Courageous",
    "Creative", "Curious", "Diligent", "Efficient", "Empathetic", "Enthusiastic", "Flexible", "Focused", "Friendly", "Generous",
    "Genuine", "Innovative", "Insightful", "Logical", "Loyal", "Mature", "Motivated", "Neutral", "Open-minded", "Optimistic",
    "Persistent", "Practical", "Proactive", "Reliable", "Resilient", "Resourceful", "Respectful", "Responsible", "Self-disciplined", "Sensible",
    "Sincere", "Sociable", "Tactful", "Tolerant", "Trustworthy", "Understanding", "Versatile", "Vibrant", "Vigilant", "Virtuous",
    "Wise", "Zestful"
];

const b2_words = [
    "Abandon", "Absorb", "Accommodate", "Acknowledge", "Adapt", "Administer", "Adopt", "Advocate", "Amend", "Analyze",
    "Apprehend", "Assemble", "Assess", "Assign", "Assume", "Attain", "Authenticate", "Banish", "Bolster", "Calculate",
    "Categorize", "Censure", "Challenge", "Cherish", "Clarify", "Coalesce", "Collaborate", "Commend", "Concede", "Conceive",
    "Conduct", "Confer", "Constitute", "Constrain", "Contrive", "Convene", "Cultivate", "Debate", "Decipher", "Deem",
    "Deliberate", "Demonstrate", "Depict", "Derive", "Designate", "Deter", "Devise", "Diminish", "Discern", "Dispute",
    "Distinguish", "Elaborate", "Elicit", "Empower", "Endure", "Enforce", "Enlist", "Enrich", "Entail", "Enumerate",
    "Equate", "Erode", "Evaluate", "Evoke", "Exacerbate", "Exemplify", "Exhibit", "Expedite", "Exploit", "Facilitate",
    "Fathom", "Foster", "Fulfill", "Garner", "Generate", "Hinder", "Illuminate", "Immerse", "Implement", "Impose",
    "Incorporate", "Indicate", "Infer", "Innovate", "Instigate", "Integrate", "Interpret", "Intervene", "Juxtapose", "Justify",
    "Leverage", "Mediate", "Mitigate", "Mobilize", "Moderate", "Navigate", "Negotiate", "Nullify", "Nurture", "Oblige",
    "Omit", "Originate", "Outweigh", "Oversee", "Pioneer", "Preserve", "Probe", "Proliferate", "Propagate", "Purge",
    "Query", "Quell", "Quench", "Reap", "Reconcile", "Reconstruct", "Refine", "Reinforce", "Remedy", "Render",
    "Renounce", "Replenish", "Reproach", "Rescind", "Reside", "Resolve", "Restore", "Retract", "Sanction", "Safeguard",
    "Saturate", "Scrupulously", "Segue", "Simulate", "Stimulate", "Substantiate", "Supplement", "Sustain", "Tackle", "Transcend",
    "Undermine", "Underscore", "Upend", "Utilize", "Validate", "Venerate", "Vex", "Vindicate", "Waive", "Wield",
    "Wrest", "Zealously", "Zeitgeist", "Zenith", "Zestful"
];

const c1_words = [
    "Aberration", "Abhorrence", "Acrimonious", "Adeptness", "Aesthetic", "Altruism", "Amalgamation", "Ambivalence", "Anomaly", "Antipathy",
    "Aplomb", "Arcane", "Arduous", "Articulate", "Auspicious", "Aversion", "Belligerent", "Cacophony", "Capitulate", "Catalyst",
    "Censure", "Cerebral", "Conjecture", "Conundrum", "Covet", "Debilitate", "Debunk", "Delineate", "Denounce", "Deride",
    "Dichotomy", "Disparage", "Disparate", "Disquiet", "Edify", "Egregious", "Elucidate", "Emulate", "Enigma", "Enthrall",
    "Ephemeral", "Epiphany", "Esoteric", "Exacerbate", "Exemplify", "Exorbitant", "Expedient", "Extrapolate", "Facetious", "Fastidious",
    "Feasible", "Fecund", "Foment", "Garrulous", "Grandiose", "Harangue", "Iconoclast", "Idiosyncrasy", "Ignominious", "Immutable",
    "Ineffable", "Inefficacious", "Inexorable", "Insidious", "Intrepid", "Inundate", "Juxtapose", "Languish", "Lethargy", "Luminous",
    "Mellifluous", "Meticulous", "Nefarious", "Obfuscate", "Opulent", "Peculiar", "Penchant", "Perfidious", "Perfunctory", "Pernicious",
    "Pervasive", "Plausible", "Poignant", "Pragmatic", "Prolific", "Propensity", "Quandary", "Quintessential", "Rancorous", "Recondite",
    "Redolent", "Relegate", "Reticent", "Salient", "Sardonic", "Sycophant", "Tenable", "Ubiquitous", "Unassailable", "Unfettered",
    "Unprecedented", "Untenable", "Vacillate", "Vehement", "Veracity", "Verbose", "Vexing", "Voracious", "Wary", "Wistful",
    "Zealous", "Zenith", "Zephyr", "Zestful", "Ziggurat", "Zephyr", "Quixotic", "Rapscallion", "Serendipity", "Peregrinate",
    "Pulchritudinous", "Recumbentibus", "Susurrus", "Taciturn", "Vicissitude", "Obfuscation", "Juxtaposition", "Discombobulate", "Ineffability", "Sesquipedalian",
    "Ephemeral", "Nebulous", "Perspicacious", "Quotidian", "Serendipity", "Supercilious", "Ubiquitous", "Sycophant", "Pernicious", "Reticent",
    "Ineffable", "Ephemeral", "Disparate", "Pernicious", "Ubiquitous", "Reticent", "Quotidian", "Supercilious", "Sycophant", "Perspicacious",
];

const c2_words = [
    "Aberration", "Acquiesce", "Alacrity", "Amalgamate", "Ambiguous", "Ameliorate", "Anachronistic", "Antediluvian", "Aplomb", "Arcane",
    "Articulate", "Aspersion", "Belligerent", "Benevolent", "Cacophony", "Capacious", "Capitulate", "Censure", "Cerebral", "Chicanery",
    "Cogent", "Cognizant", "Compendium", "Concomitant", "Conflagration", "Confluence", "Conjecture", "Conspicuous", "Corpulent", "Credulous",
    "Dearth", "Debilitate", "Debunk", "Deleterious", "Demure", "Denigrate", "Deride", "Desultory", "Dichotomy", "Dilapidated",
    "Disparate", "Duplicity", "Ebullient", "Eclectic", "Ephemeral", "Epitome", "Equanimity", "Esoteric", "Ethereal", "Evince",
    "Exacerbate", "Exculpate", "Exorbitant", "Expedient", "Extraneous", "Facetious", "Fastidious", "Fatuous", "Fecund", "Fervent",
    "Flabbergasted", "Flippant", "Furtive", "Garrulous", "Gregarious", "Harangue", "Hapless", "Harbinger", "Herculean", "Hubris",
    "Iconoclast", "Idiosyncrasy", "Immutable", "Impetuous", "Imperative", "Ineffable", "Inexorable", "Ingenuous", "Inscrutable", "Insidious",
    "Intrepid", "Inundate", "Juxtapose", "Languid", "Lethargic", "Loquacious", "Mellifluous", "Mendacious", "Mercurial", "Meticulous",
    "Munificent", "Nebulous", "Nefarious", "Nomenclature", "Nonchalant", "Obfuscate", "Obsequious", "Obstreperous", "Onerous", "Opulent",
    "Pernicious", "Pertinacious", "Petrify", "Platitude", "Plethora", "Precarious", "Precipitate", "Proclivity", "Propinquity", "Propitious",
    "Pugnacious", "Quagmire", "Quell", "Querulous", "Quixotic", "Quotidian", "Rambunctious", "Rapacious", "Recalcitrant", "Redolent",
    "Redoubtable", "Refulgent", "Relegate", "Remonstrate", "Reticent", "Sagacious", "Salient", "Sardonic", "Sycophant", "Taciturn",
    "Tantamount", "Trepidation", "Ubiquitous", "Unctuous", "Unilateral", "Usurp", "Vacillate", "Vehement", "Voracious", "Wane",
    "Wily", "Zealous", "Pulchritudinous", "Recumbentibus", "Susurrus", "Taciturn", "Vicissitude", "Obfuscation", "Juxtaposition", "Discombobulate",
    "Ineffability", "Sesquipedalian", "Ephemeral", "Nebulous", "Perspicacious", "Quotidian", "Serendipity", "Supercilious", "Ubiquitous", "Sycophant",
    "Pernicious", "Reticent", "Ineffable", "Ephemeral", "Disparate", "Pernicious", "Ubiquitous", "Reticent", "Quotidian", "Supercilious",
    "Sycophant", "Perspicacious", "Aberration", "Antediluvian", "Esoteric", "Munificent", "Precarious", "Proclivity", "Quixotic", "Reticent",
    "Sagacious", "Salient", "Sardonic", "Sycophant", "Taciturn", "Trepidation", "Ubiquitous", "Voracious", "Zealous", "Zenith"
];

export const words = [b1_words, b2_words, c1_words, c2_words];