import React, { useState, useEffect } from 'react';
import SweetAlert from './SweetAlert';
import { getDataFromLocalStorage, setDataIntoLocalStorage } from '../../components/helper/commonFunction';

const useExceedAttemptsPopup = (maxAttempts, ip, appId) => {
  const storageKey = `attempts_${ip}_${appId}`;
  const [showPopup, setShowPopup] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [holdGenerate, setHoldGenerate] = useState(false);

  useEffect(() => {
    const storedAttempts = getDataFromLocalStorage(storageKey);
    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts, 10));
    }
  }, [storageKey]);

  const handleClickAttempt = () => {
    const newAttempts = attempts + 1;

    if (newAttempts > maxAttempts) {
      setShowPopup(true);
      setHoldGenerate(true);
      setDataIntoLocalStorage(storageKey, newAttempts.toString());
      return false;
    }

    setAttempts(newAttempts);
    setDataIntoLocalStorage(storageKey, newAttempts.toString());
    return true;
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Reset attempts if needed
   // setAttempts(0);
    //localStorage.removeItem(storageKey);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
    // Reset attempts if needed
  };

  const renderPopup = () => {
    return showPopup ?
    <SweetAlert onClose={handleClosePopup} visible={showPopup} setVisible={setShowPopup} />
    : null;
  };

  return {
    handleClickAttempt,
    renderPopup,
    holdGenerate,
  };
};

export default useExceedAttemptsPopup;
