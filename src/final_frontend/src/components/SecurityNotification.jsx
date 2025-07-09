import React, { useEffect, useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, X, Clock } from 'lucide-react';

const SecurityNotification = ({ type, message, isVisible, onClose, autoClose = true, duration = 5000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible && autoClose) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 100));
          if (newProgress <= 0) {
            onClose();
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200',
          icon: 'text-green-600 dark:text-green-400',
          progress: 'bg-green-500'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
          icon: 'text-yellow-600 dark:text-yellow-400',
          progress: 'bg-yellow-500'
        };
      case 'error':
        return {
          container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200',
          icon: 'text-red-600 dark:text-red-400',
          progress: 'bg-red-500'
        };
      default:
        return {
          container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200',
          icon: 'text-blue-600 dark:text-blue-400',
          progress: 'bg-blue-500'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'warning':
      case 'error':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const styles = getNotificationStyles();

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div className={`border rounded-lg p-4 shadow-lg transition-all duration-300 ${styles.container}`}>
        <div className="flex items-start space-x-3">
          <div className={styles.icon}>
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {autoClose && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div
                className={`h-1 rounded-full transition-all duration-100 ${styles.progress}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityNotification;