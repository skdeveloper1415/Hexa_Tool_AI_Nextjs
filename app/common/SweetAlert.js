import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ visible, setVisible }) => {
  useEffect(() => {
    if (visible) {
      Swal.fire({
        title: "Exceeded Number of Attempts",
        text: "You have exceeded the allowed number of attempts!",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: '#E57200',
        onClose: () => setVisible(false)
      });
    }
  }, [visible, setVisible]);

  return null; 
};


export default SweetAlert;
