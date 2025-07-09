import React, { useEffect, useState } from 'react';
import { AlertTriangle, Shield, X, Clock, Ban } from 'lucide-react';

const ThreatAlert = ({ isOpen, onClose, transactionData, autoClose = true }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, onClose, autoClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 relative border-2 border-red-500 shadow-2xl animate-pulse">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            🚨 THREAT DETECTED!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Malicious transaction blocked by ChainGuard AI
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">Action:</span>
              <span className="text-red-600 dark:text-red-400 font-bold">{transactionData?.action}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">Value:</span>
              <span className="text-red-600 dark:text-red-400 font-bold">{transactionData?.value}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
              <span className="text-red-600 dark:text-red-400 font-bold flex items-center gap-1">
                <Ban className="h-4 w-4" />
                BLOCKED
              </span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-700 dark:text-green-300">Protection Active</span>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400">
            Your funds are safe. The malicious transaction has been automatically reverted and blocked.
          </p>
        </div>

        {autoClose && (
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Clock className="h-4 w-4" />
            <span>Auto-closing in {countdown} seconds</span>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              // Could open a detailed report or contact support
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreatAlert;