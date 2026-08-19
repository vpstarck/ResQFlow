export const loginDriver = async (
  hospitalName,
  ambulanceNumber,
  driverPhone
) => {
  try {
    const ambulanceRef = collection(db, "ambulances");

    const q = query(
      ambulanceRef,
      where("hospitalName", "==", hospitalName),
      where("ambulanceNumber", "==", ambulanceNumber),
      where("driverPhone", "==", driverPhone)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        message: "Invalid login credentials"
      };
    }

    const doc = querySnapshot.docs[0];

    const ambulanceData = {
      id: doc.id,
      ...doc.data()
    };

    localStorage.setItem(
      "currentDriver",
      JSON.stringify(ambulanceData)
    );

    return {
      success: true,
      data: ambulanceData
    };

  } catch (error) {
    console.error("Login Error:", error);

    return {
      success: false,
      message: error.message
    };
  }
};
