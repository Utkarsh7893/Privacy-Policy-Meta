import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Check, ShieldCheck } from 'lucide-react';
import './App.css';

const policies = [
  { emoji: '📝', title: 'Introduction & Consent', desc: 'By accessing and using our applications, you formally agree to the terms outlined in this Privacy Policy.' },
  { emoji: '👤', title: 'Personal Data Collection', desc: 'We collect minimal profile details, such as your name and username, strictly during the account registration process.' },
  { emoji: '📧', title: 'Email Address Usage', desc: 'Your email address is required for account verification, password recovery, and essential service notifications.' },
  { emoji: '📱', title: 'Device Information', desc: 'We collect non-identifiable data like your OS version and device model to optimize the performance and layout of our apps.' },
  { emoji: '📊', title: 'Usage Analytics', desc: 'We securely track general app usage (e.g., feature interactions, session durations) to continuously improve your user experience.' },
  { emoji: '🔒', title: 'Data Security Measures', desc: 'Your personal data is encrypted both in transit and at rest using industry-standard security protocols to prevent unauthorized access.' },
  { emoji: '🚫', title: 'No Sale of Personal Data', desc: 'We value your privacy. We strictly DO NOT sell, rent, or trade your personal data to any third parties.' },
  { emoji: '🤝', title: 'Trusted Third-Party Services', desc: 'We partner with vetted third parties (such as cloud hosting providers) who are legally bound by strict confidentiality agreements.' },
  { emoji: '🍪', title: 'Cookies & Local Storage', desc: 'We utilize secure, minimal local storage mechanisms to remember your active sessions and app preferences seamlessly.' },
  { emoji: '🛡️', title: 'Children\'s Privacy', desc: 'Our applications are not intended for children under 13. We do not knowingly collect or maintain data from minors.' },
  { emoji: '⚖️', title: 'Legal Compliance', desc: 'We may disclose your information only if legally required by law enforcement or to protect our legitimate legal rights.' },
  { emoji: '🔄', title: 'Policy Updates', desc: 'We reserve the right to update this policy periodically. Your continued use of the apps constitutes acceptance of the latest version.' },
  { emoji: '🌍', title: 'International Data Transfers', desc: 'Your data may be processed in countries outside your residence, but always subject to adequate data protection safeguards.' },
  { emoji: '🗑️', title: 'Account & Data Deletion', desc: 'You retain full rights to request the complete and permanent deletion of your account and all associated personal data.' },
  { emoji: '📬', title: 'Contact for Deletion & Queries', desc: 'To request account deletion or if you have any questions, please email us directly at jaycob4498@gmail.com.' },
];

function Background3D() {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function App() {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 100;
      if (scrollPosition >= threshold) {
        setScrolledToBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial state in case content is short
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccept = () => {
    if (isChecked) {
      setShowPopup(true);
    }
  };

  return (
    <div className="app-container">
      <div className="background-image"></div>
      
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Background3D />
        </Canvas>
      </div>

      <div className="content-wrapper">
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="title">Privacy Policy</h1>
          <p className="subtitle">Please review our comprehensive privacy and data protection guidelines.</p>

          <div className="policy-list">
            {policies.map((policy, index) => (
              <motion.div 
                key={index} 
                className="policy-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="emoji">{policy.emoji}</div>
                <div className="policy-text">
                  <h3>{policy.title}</h3>
                  {policy.title === 'Contact for Deletion & Queries' ? (
                    <p>
                      To request account deletion or if you have any questions, please email us directly at{' '}
                      <a href="mailto:jaycob4498@gmail.com" className="mail-link">jaycob4498@gmail.com</a>.
                    </p>
                  ) : (
                    <p>{policy.desc}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="consent-section">
            <div 
              className={`checkbox-container ${!scrolledToBottom ? 'disabled' : ''}`}
              onClick={() => {
                if (scrolledToBottom) setIsChecked(!isChecked);
              }}
            >
              <input type="checkbox" checked={isChecked} readOnly />
              <div className="custom-checkbox">
                {isChecked && <Check className="check-icon" />}
              </div>
              <span>
                {!scrolledToBottom 
                  ? "Please read all terms to enable consent." 
                  : "I have read and agree to the Privacy Policy."}
              </span>
            </div>

            <button 
              className="accept-btn"
              disabled={!isChecked}
              onClick={handleAccept}
            >
              Accept the terms and condition
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="popup-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="popup-icon">
                <ShieldCheck size={32} />
              </div>
              <h2 className="popup-title">Consent Accepted</h2>
              <p className="popup-message">
                You have successfully read and accepted all the terms. Thank you for your co-operation and consent.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
