'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, ArrowRight, Table as TableIcon, RefreshCcw } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 工具函数：合并 Tailwind 类名
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [step, setStep] = useState<'input' | 'processing' | 'result'>('input');
  const [text, setText] = useState('');

  // 模拟处理过程（因为暂时不接后端）
  const handleMagic = () => {
    if (!text) return;
    setStep('processing');
    setTimeout(() => {
      setStep('result');
    }, 2000); // 假装思考2秒
  };

  const reset = () => {
    setStep('input');
    setText('');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-purple-500/30">
      
      {/* --- 背景层：动态光斑 --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full blur-[100px]" 
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* --- 内容层 --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        
        {/* 标题区域 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300">
            <Sparkles className="w-3 h-3" />
            AI Table Magic
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-blue-200">
            让数据不再混乱
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            丢进杂乱无章的文本，见证它们瞬间变成井井有条的表格。
          </p>
        </motion.div>

        {/* 主卡片区域 */}
        <motion.div 
          layout
          className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
        >
          <AnimatePresence mode="wait">
            
            {/* 状态 1: 输入界面 */}
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6 md:p-8 space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">粘贴你的混乱数据</label>
                  <div className="relative group">
                    <textarea 
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="例如：张三 13800138000 北京市朝阳区..."
                      className="w-full h-48 bg-black/20 border border-white/10 rounded-xl p-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition resize-none font-mono text-sm leading-relaxed"
                    />
                    <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/5 group-hover:border-purple-500/30 transition duration-500" />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMagic}
                  disabled={!text}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-purple-900/20 hover:shadow-purple-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                  施展魔法
                </motion.button>
              </motion.div>
            )}

            {/* 状态 2: 处理动画 (Loading) */}
            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 flex flex-col items-center justify-center min-h-[400px] text-center space-y-6"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-16 h-16 border-4 border-blue-500/20 border-b-blue-500 rounded-full scale-75"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">正在重组数据原子...</h3>
                <p className="text-sm text-gray-500">AI 正在理解你的内容结构</p>
              </motion.div>
            )}

            {/* 状态 3: 结果展示 (Mock) */}
            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col h-[500px]"
              >
                <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-purple-300">
                    <TableIcon className="w-5 h-5" />
                    <span className="font-semibold">整理结果</span>
                  </div>
                  <button 
                    onClick={reset}
                    className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white"
                    title="重新开始"
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 p-6 overflow-auto">
                  {/* 这里是一个模拟的表格 UI，等以后接真实数据 */}
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                        <th className="pb-3 pl-2">姓名</th>
                        <th className="pb-3">联系方式</th>
                        <th className="pb-3">城市</th>
                        <th className="pb-3 text-right">状态</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-300">
                      {[1, 2, 3].map((i) => (
                        <motion.tr 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-4 pl-2 font-medium text-white">示例用户 {i}</td>
                          <td className="py-4">138-0000-000{i}</td>
                          <td className="py-4">上海市浦东新区</td>
                          <td className="py-4 text-right">
                            <span className="px-2 py-1 rounded bg-green-500/20 text-green-300 text-xs">
                              已验证
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-200 flex items-start gap-3">
                    <div className="mt-0.5">ℹ️</div>
                    <p>这是一个 UI 演示。现在你可以连接后端逻辑，将这些假数据替换为真实的 AI 响应。</p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

        {/* 底部 Footer */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>Powered by Vercel & Gemini AI</p>
        </div>

      </div>
    </main>
  );
}