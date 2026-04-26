/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History, 
  Sparkles, 
  Ship, 
  Cpu, 
  ScrollText, 
  UserPlus,
  Radio,
  Disc,
  Monitor,
  Search,
  Rocket,
  Megaphone,
  Mountain,
  Gamepad2,
  Zap,
  ArrowRight,
  Loader2,
  Quote,
  Clock,
  Swords,
  Footprints,
  Puzzle
} from 'lucide-react';
import { translateSlang, TranslationResult } from './services/gemini';

export default function App() {
  const [phrase, setPhrase] = useState('');
  const [age, setAge] = useState(25);
  const [culture, setCulture] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TranslationResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!phrase.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await translateSlang(phrase, age, culture);
      setResults(data);
    } catch (err) {
      setError('The floral gears have jammed. Try pruning your phrase!');
    } finally {
      setLoading(false);
    }
  };

  const eraConfigs: Record<string, { icon: ReactNode, label: string, color: string, badge: string, font: string }> = {
    '1800s': { 
      icon: <History className="w-5 h-5" />, 
      label: 'Victorian Era', 
      color: 'bg-indigo-950/40 border-indigo-500/30', 
      badge: 'bg-indigo-900/50 text-indigo-300 border-indigo-500/50', 
      font: 'font-serif text-slate-200' 
    },
    '1920s': { 
      icon: <Sparkles className="w-5 h-5" />, 
      label: '1920s Flapper', 
      color: 'bg-rose-950/30 border-rose-900/50', 
      badge: 'bg-rose-900/30 text-rose-400 border-rose-900/50', 
      font: 'font-sans text-slate-300' 
    },
    'Pirates': { 
      icon: <Ship className="w-5 h-5" />, 
      label: 'High Seas', 
      color: 'bg-blue-950/30 border-blue-900/50', 
      badge: 'bg-blue-900/30 text-blue-400 border-blue-900/50', 
      font: 'font-sans font-bold text-slate-300' 
    },
    'Computery Talk': { 
      icon: <Cpu className="w-5 h-5" />, 
      label: 'Terminal / Logic', 
      color: 'bg-slate-900 border-slate-800', 
      badge: 'bg-green-900/30 text-green-400 border-green-900/50', 
      font: 'font-mono text-slate-300' 
    },
    'Shakespearean': { 
      icon: <ScrollText className="w-5 h-5" />, 
      label: '1600s Shakespearean', 
      color: 'bg-slate-900 border-slate-800', 
      badge: 'bg-amber-900/30 text-amber-400 border-amber-900/50', 
      font: 'font-serif italic text-slate-300' 
    },
    'Over-Explaining': { 
      icon: <Quote className="w-5 h-5" />, 
      label: 'Hyper-Literal', 
      color: 'bg-slate-900 border-slate-800', 
      badge: 'bg-slate-800 text-slate-400 border-slate-700', 
      font: 'text-xs text-slate-400 tracking-tighter uppercase' 
    },
    'Skateboarding Slang': { 
      icon: <Footprints className="w-5 h-5" />, 
      label: '90s Shredder', 
      color: 'bg-orange-950/30 border-orange-900/50', 
      badge: 'bg-orange-900/30 text-orange-400 border-orange-900/50', 
      font: 'font-sans text-slate-300 italic' 
    },
    'Medieval Times': { 
      icon: <Swords className="w-5 h-5" />, 
      label: 'Chivalric Code', 
      color: 'bg-red-950/30 border-red-900/50', 
      badge: 'bg-red-900/30 text-red-400 border-red-900/50', 
      font: 'font-serif text-slate-200' 
    },
    'Taboo Restricted': { 
      icon: <Puzzle className="w-5 h-5" />, 
      label: 'Taboo / Logic', 
      color: 'bg-indigo-950/40 border-indigo-800/50', 
      badge: 'bg-indigo-900/30 text-indigo-400 border-indigo-900/50', 
      font: 'font-mono text-sm text-slate-300 lowercase' 
    },
    '1950s': { 
      icon: <Radio className="w-5 h-5" />, 
      label: '1950s Beats', 
      color: 'bg-cyan-950/30 border-cyan-900/50', 
      badge: 'bg-cyan-900/30 text-cyan-400 border-cyan-900/50', 
      font: 'font-sans text-slate-300 tracking-tight' 
    },
    '1970s': { 
      icon: <Disc className="w-5 h-5" />, 
      label: '1970s Disco', 
      color: 'bg-fuchsia-950/30 border-fuchsia-900/50', 
      badge: 'bg-fuchsia-900/30 text-fuchsia-400 border-fuchsia-900/50', 
      font: 'font-sans text-slate-200 font-medium' 
    },
    '1990s': { 
      icon: <Monitor className="w-5 h-5" />, 
      label: '1990s Digital', 
      color: 'bg-lime-950/20 border-lime-900/40', 
      badge: 'bg-lime-900/30 text-lime-400 border-lime-900/50', 
      font: 'font-mono text-slate-300' 
    },
    'Detective Noir': { 
      icon: <Search className="w-5 h-5" />, 
      label: 'Gumshoe Noir', 
      color: 'bg-zinc-900 border-zinc-700', 
      badge: 'bg-zinc-800 text-zinc-400 border-zinc-600', 
      font: 'font-serif text-slate-400 italic' 
    },
    'Space Colonist': { 
      icon: <Rocket className="w-5 h-5" />, 
      label: 'Martian Frontier', 
      color: 'bg-emerald-950/30 border-emerald-900/50', 
      badge: 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50', 
      font: 'font-mono text-sm uppercase tracking-widest' 
    },
    '1940s': { 
      icon: <Megaphone className="w-5 h-5" />, 
      label: '1940s Radio', 
      color: 'bg-zinc-950/40 border-zinc-900/50', 
      badge: 'bg-zinc-900/30 text-zinc-400 border-zinc-900/50', 
      font: 'font-serif text-slate-300 uppercase tracking-tighter' 
    },
    'Caveman Speak': { 
      icon: <Mountain className="w-5 h-5" />, 
      label: 'First Era', 
      color: 'bg-stone-950 border-stone-800', 
      badge: 'bg-stone-800 text-stone-400 border-stone-700', 
      font: 'font-sans font-black text-slate-100 uppercase tracking-[0.2em]' 
    },
    'Streamer Slang': { 
      icon: <Gamepad2 className="w-5 h-5" />, 
      label: 'Digital Hype', 
      color: 'bg-indigo-950/20 border-indigo-500/20', 
      badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30', 
      font: 'font-sans font-bold text-indigo-100 italic' 
    },
    'Internet Brainrot': { 
      icon: <Zap className="w-5 h-5" />, 
      label: 'Cognitive Decay', 
      color: 'bg-slate-900 border-indigo-900/30', 
      badge: 'bg-indigo-950 text-indigo-400 border-indigo-500/20', 
      font: 'font-mono text-xs text-indigo-300 brightness-125' 
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <ScrollText className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-2">
                Poinsettia <span className="text-indigo-400 italic">Stone</span>
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Sub-Optimal Linguistic Decryption</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-[10px] text-slate-400 flex items-center gap-2 uppercase font-bold tracking-wider">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Temporal Engine Active
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-[10px] text-slate-400 flex items-center gap-2 uppercase font-bold tracking-wider">
              Status: Slightly Confused
            </div>
          </div>
        </header>

        {/* Input Console */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[80px] group-hover:bg-indigo-600/10 transition-all duration-700" />
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px_250px_auto] gap-8 items-end relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Vague Original Phrase</label>
              <textarea
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="Inscribe your modern utterance here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all min-h-[60px] max-h-[160px] scrollbar-hide text-lg"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 text-center block">Temporal Age of Utterer</label>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center gap-3 h-[120px] overflow-hidden relative group/age">
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
                <div 
                  className="overflow-y-scroll scrollbar-hide w-full flex flex-col items-center gap-2 py-8 snap-y snap-mandatory"
                  onScroll={(e) => {
                    const scrollY = (e.target as HTMLDivElement).scrollTop;
                    const index = Math.round(scrollY / 32);
                    const newAge = index + 5;
                    if (newAge >= 5 && newAge <= 100 && newAge !== age) {
                      setAge(newAge);
                    }
                  }}
                >
                  {Array.from({ length: 96 }, (_, i) => i + 5).map((val) => (
                    <div 
                      key={val} 
                      className={`snap-center text-xl font-serif transition-colors shrink-0 h-8 flex items-center justify-center ${val === age ? 'text-indigo-400 font-bold scale-125' : 'text-purple-300 font-medium opacity-50'}`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full mt-2 py-2 px-4 bg-slate-950/50 border border-slate-800/50 rounded-xl text-center">
                <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">
                  {age >= 78 ? 'Silent Generation' :
                   age >= 60 ? 'Baby Boomer' :
                   age >= 44 ? 'Generation X' :
                   age >= 28 ? 'Millennial' :
                   age >= 13 ? 'Generation Z' : 'Gen Alpha'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 text-center block">Cultural Context</label>
              <select
                value={culture}
                onChange={(e) => setCulture(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all text-sm h-[60px] cursor-pointer appearance-none"
              >
                <option value="">Detect Selection...</option>
                <option value="Gen Alpha Brainrot / Surrealist">Gen Alpha Brainrot / Surrealist</option>
                <option value="Gen Z Post-Ironic / Chronic Online">Gen Z Post-Ironic / Chronic Online</option>
                <option value="Millennial Self-Deprecating / Vine-Era">Millennial Self-Deprecating / Vine-Era</option>
                <option value="Gen X Disenchanted / Grunge-Cynic">Gen X Disenchanted / Grunge-Cynic</option>
                <option value="Boomer Traditionalist / Mainstream">Boomer Traditionalist / Mainstream</option>
                <option value="Early Digital / Y2K Aesthetic">Early Digital / Y2K Aesthetic</option>
                <option value="Retro-Futurist / Synthwave Pulse">Retro-Futurist / Synthwave Pulse</option>
                <option value="Elite Academic / High-Literacy Gatekeeping">Elite Academic / High-Literacy Gatekeeping</option>
              </select>
              <p className="text-[10px] text-slate-700 font-medium italic text-center">Calibrating background resonance...</p>
            </div>

            <button 
              onClick={handleTranslate}
              disabled={loading || !phrase.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-[60px] px-8 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'DECODE'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mr-2">Samples:</span>
            {['No cap', 'This is fire', 'I am so cooked', 'Main character energy'].map((ex) => (
              <button
                key={ex}
                onClick={() => setPhrase(ex)}
                className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300 transition-colors bg-slate-950"
              >
                {ex}
              </button>
            ))}
          </div>
        </section>

        {/* Results Grid */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-950/20 border border-red-500/30 rounded-3xl p-8 text-red-400 text-center font-bold uppercase tracking-widest text-xs"
              >
                {error}
              </motion.div>
            ) : results.length > 0 && !loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
              >
                {results.map((result, idx) => {
                  const config = eraConfigs[result.era] || { 
                    label: result.era, 
                    color: 'bg-slate-900 border-slate-800', 
                    badge: 'bg-slate-800 text-slate-400 border-slate-700', 
                    font: 'text-slate-300' 
                  };
                  
                  return (
                    <motion.div
                      key={result.era}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`h-full ${config.color} border rounded-2xl p-6 relative group overflow-hidden flex flex-col shadow-lg transition-transform hover:-translate-y-1 duration-300`}
                    >
                      <div className="mb-4 flex items-center justify-between relative z-10">
                        <span className={`text-[10px] px-2 py-1 rounded border font-bold uppercase tracking-tighter ${config.badge}`}>
                          {config.label}
                        </span>
                        <div className="text-slate-600 group-hover:text-indigo-500/50 transition-colors">
                          {eraConfigs[result.era]?.icon}
                        </div>
                      </div>
                      
                      <div className="flex-grow flex items-center mb-6 relative z-10">
                        <p className={`text-xl leading-relaxed ${config.font}`}>
                          "{result.translation}"
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-white/5 relative z-10">
                        <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-tight group-hover:text-slate-400 transition-colors">
                          {result.description}
                        </p>
                      </div>

                      {/* Accent highlight */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : !loading && (
              <div className="flex flex-col items-center justify-center py-20 opacity-20 pointer-events-none select-none">
                <ScrollText className="w-16 h-16 mb-6" />
                <p className="text-xl font-serif italic tracking-widest uppercase text-center">
                  Temporal Vault Locked<br />
                  <span className="text-sm">Input data to synchronize eras</span>
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Status */}
        <footer className="mt-12 py-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold gap-4">
          <div className="flex items-center gap-6">
            <span>{results.length} Slang Variants Generated</span>
            <span className="hidden md:inline text-slate-800">•</span>
            <span>Encryption Level: Historical Standard</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Vault Index: #P7-STONE</span>
            <span className="hidden md:inline text-slate-800">•</span>
            <span>Est. Precision: Low (By Design)</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

