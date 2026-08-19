import React, { useState } from "react";

const PatientRecord = ({
  patient = {},
  emergency = {},
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    patientName: patient.patientName || "",
    patientAge: patient.patientAge || "",
    patientGender: patient.patientGender || "",
    emergencyType: emergency.emergencyType || "",
    severity: emergency.priority || "",
    arrivalTime: patient.arrivalTime || "",
    diagnosis: patient.diagnosis || "",
    treatment: patient.treatment || "",
    doctorName: patient.doctorName || "",
    medicines: patient.medicines || "",
    procedures: patient.procedures || "",
    notes: patient.notes || "",
    patientStatus: patient.patientStatus || "Admitted",
    transferRequired: patient.transferRequired || false,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);

    try {
      if (onSave) {
        await onSave({
          ...formData,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Failed to save patient record:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="patient-record">
      <div className="patient-record-header">
        <div>
          <h2>Patient Treatment Record</h2>
          <p>Enter the patient's treatment and hospital details.</p>
        </div>

        {patient.patientId && (
          <span className="patient-id">
            Patient ID: {patient.patientId}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Patient Information */}
        <section className="record-section">
          <h3>Patient Information</h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="patientName">Patient Name</label>
              <input
                id="patientName"
                name="patientName"
                type="text"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientAge">Age</label>
              <input
                id="patientAge"
                name="patientAge"
                type="number"
                min="0"
                value={formData.patientAge}
                onChange={handleChange}
                placeholder="Age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientGender">Gender</label>
              <select
                id="patientGender"
                name="patientGender"
                value={formData.patientGender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="arrivalTime">Arrival Time</label>
              <input
                id="arrivalTime"
                name="arrivalTime"
                type="datetime-local"
                value={formData.arrivalTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Emergency Information */}
        <section className="record-section">
          <h3>Emergency Information</h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="emergencyType">Emergency Type</label>
              <input
                id="emergencyType"
                name="emergencyType"
                type="text"
                value={formData.emergencyType}
                onChange={handleChange}
                placeholder="e.g. Heart Attack"
              />
            </div>

            <div className="form-group">
              <label htmlFor="severity">Severity</label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
              >
                <option value="">Select severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </section>

        {/* Diagnosis and Treatment */}
        <section className="record-section">
          <h3>Diagnosis & Treatment</h3>

          <div className="form-group">
            <label htmlFor="diagnosis">Diagnosis</label>
            <textarea
              id="diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Enter doctor's diagnosis"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="treatment">Treatment Description</label>
            <textarea
              id="treatment"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="Describe the treatment provided"
              rows="4"
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="doctorName">Doctor / Consultant</label>
              <input
                id="doctorName"
                name="doctorName"
                type="text"
                value={formData.doctorName}
                onChange={handleChange}
                placeholder="Doctor name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="procedures">Procedures Performed</label>
              <input
                id="procedures"
                name="procedures"
                type="text"
                value={formData.procedures}
                onChange={handleChange}
                placeholder="e.g. CT Scan, Surgery"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="medicines">Medicines / Medication</label>
            <textarea
              id="medicines"
              name="medicines"
              value={formData.medicines}
              onChange={handleChange}
              placeholder="Enter medicines administered or prescribed"
              rows="3"
            />
          </div>
        </section>

        {/* Patient Status */}
        <section className="record-section">
          <h3>Patient Status</h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="patientStatus">Current Status</label>
              <select
                id="patientStatus"
                name="patientStatus"
                value={formData.patientStatus}
                onChange={handleChange}
              >
                <option value="Admitted">Admitted</option>
                <option value="Under Treatment">Under Treatment</option>
                <option value="Stable">Stable</option>
                <option value="Critical">Critical</option>
                <option value="Discharged">Discharged</option>
                <option value="Transferred">Transferred</option>
              </select>
            </div>
          </div>

          {/* Hospital-to-Hospital Transfer */}
          <div className="transfer-option">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="transferRequired"
                checked={formData.transferRequired}
                onChange={handleChange}
              />

              <span>
                <strong>Patient requires transfer</strong>
                <small>
                  Select this if the patient needs treatment at another
                  hospital.
                </small>
              </span>
            </label>
          </div>
        </section>

        {/* Additional Notes */}
        <section className="record-section">
          <h3>Additional Notes</h3>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional information"
              rows="4"
            />
          </div>
        </section>

        {/* Actions */}
        <div className="record-actions">
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Patient Record"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRecord;
