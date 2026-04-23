/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Copy, Check, Zap } from 'lucide-react';

export default function App() {
  const [deviceKey, setDeviceKey] = useState('');
  const [copied, setCopied] = useState(false);

  const baseUrl = 'https://xtream.cloud/custom-playlist';
  const queryParams = '?type=xtream&mode=add';
  const fullUrl = deviceKey 
    ? `${baseUrl}?device_key=${encodeURIComponent(deviceKey)}&type=xtream&mode=add`
    : '';

  const handleOpenLink = useCallback(() => {
    if (!deviceKey) return;
    window.open(fullUrl, '_blank');
  }, [deviceKey, fullUrl]);

  const handleCopyLink = useCallback(async () => {
    if (!deviceKey) return;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [deviceKey, fullUrl]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4 font-sans text-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] shadow-sm p-8 border border-gray-100"
        id="generator-card"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Xtream Link Generator
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Insira o código do dispositivo para gerar o link da sua playlist.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="device-key" 
              className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-1"
            >
              Código do Dispositivo
            </label>
            <input
              id="device-key"
              type="text"
              placeholder="Ex: COLEOCODIGO"
              value={deviceKey}
              onChange={(e) => setDeviceKey(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg font-medium"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenLink}
              disabled={!deviceKey}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all shadow-sm ${
                deviceKey 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              id="open-link-btn"
            >
              <ExternalLink className="w-5 h-5" />
              Gerar e Abrir Link
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyLink}
              disabled={!deviceKey}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all border ${
                deviceKey 
                  ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer' 
                  : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              id="copy-link-btn"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  Link Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copiar Link
                </>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {deviceKey && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
                    URL Gerada:
                  </p>
                  <p className="text-xs text-gray-500 break-all font-mono">
                    {fullUrl}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="fixed bottom-6 text-gray-400 text-xs tracking-widest uppercase font-semibold">
        Xtream Cloud Helper
      </div>
    </div>
  );
}
