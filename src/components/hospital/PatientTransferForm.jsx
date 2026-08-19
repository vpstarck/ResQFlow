```jsx
import React, { useState } from "react";

const PatientTransferForm = ({
  patient = {},
  onFindHospital,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    patientId: patient.patientId || "",
    patientName: patient.patientName || "",
    emergencyType: patient.emergencyType || "",
    severity: patient.severity || "critical",

    requiredFacilities: {
      icu: false,
      emergencyBed: false,
      ventilator: false,
      traumaUnit: false,
      ctScan: false,
      mri: false,
      surgery: false,
      cardiacUnit: false,
      dialysis: false,
    },

    requiredDoctors: {
      cardiologist: false,
      neurologist: false,
      neurosurgeon: false,
      pulmonologist: false,
      traumaSpecialist: false,
      surgeon: false,
      nephrologist: false,
    },

    ambulanceRequired: true,
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleBasicChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFacilityChange = (event) => {
    const { name, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      requiredFacilities: {
        ...previous.requiredFacilities,
        [name]: checked,
      },
    }));
  };

  const handleDoctorChange = (event) => {
    const { name, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      requiredDoctors: {
        ...previous.requiredDoctors,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedFacilities = Object.keys(
      formData.requiredFacilities
    ).filter(
      (facility) => formData.requiredFacilities[facility]
    );

    const selectedDoctors = Object.keys(
      formData.requiredDoctors
    ).filter(
      (doctor) => formData.requiredDoctors[doctor]
    );

    if (selectedFacilities.length === 0 && selectedDoctors.length === 0) {
      alert(
        "Please select at least one required facility or specialist."
      );
      return;
    }

    const transferRequest = {
      ...formData,
      selectedFacilities,
      selectedDoctors,
      status: "SEARCHING_HOSPITAL",
      createdAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true);

      if (onFindHospital) {
        await onFindHospital(transferRequest);
      }
    } catch (error) {
      console.error("Failed to create transfer request:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="patient-transfer-form">
      <div className="transfer-header">
        <div>
          <h2>Inter-Hospital Transfer</h2>
          <p>
            Enter the patient's requirements to find a suitable
            destination hospital.
          </p>
        </div>

        {formData.patientId && (
          <span className="patient-id">
            Patient ID: {formData.patientId}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Patient Information */}
        <section className="transfer-section">
          <h3>Patient Information</h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="patientId">Patient ID</label>
              <input
                id="patientId"
                name="patientId"
                type="text"
                value={formData.patientId}
                onChange={handleBasicChange}
                placeholder="Patient ID"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientName">Patient Name</label>
              <input
                id="patientName"
                name="patientName"
                type="text"
                value={formData.patientName}
                onChange={handleBasicChange}
                placeholder="Patient name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyType">
                Emergency / Condition
              </label>
              <input
                id="emergencyType"
                name="emergencyType"
                type="text"
                value={formData.emergencyType}
                onChange={handleBasicChange}
                placeholder="e.g. Heart Attack"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="severity">Severity</label>

              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleBasicChange}
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </section>

        {/* Required Facilities */}
        <section className="transfer-section">
          <h3>Required Facilities</h3>

          <p className="section-description">
            Select the facilities required for the patient's
            treatment.
          </p>

          <div className="checkbox-grid">
            <label className="checkbox-card">
              <input
                type="checkbox"
                name="icu"
                checked={formData.requiredFacilities.icu}
                onChange={handleFacilityChange}
              />
              <span>
                <strong>ICU</strong>
                <small>Intensive Care Unit</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="emergencyBed"
                checked={
                  formData.requiredFacilities.emergencyBed
                }
                onChange={handleFacilityChange}
              />
              <span>
                <strong>Emergency Bed</strong>
                <small>Emergency department bed</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="ventilator"
                checked={
                  formData.requiredFacilities.ventilator
                }
                onChange={handleFacilityChange}
              />
              <span>
                <strong>Ventilator</strong>
                <small>Mechanical ventilation</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="traumaUnit"
                checked={
                  formData.requiredFacilities.traumaUnit
                }
                onChange={handleFacilityChange}
              />
              <span>
                <strong>Trauma Unit</strong>
                <small>Trauma care facility</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="ctScan"
                checked={formData.requiredFacilities.ctScan}
                onChange={handleFacilityChange}
              />
              <span>
                <strong>CT Scan</strong>
                <small>Computed tomography</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="mri"
                checked={formData.requiredFacilities.mri}
                onChange={handleFacilityChange}
              />
              <span>
                <strong>MRI</strong>
                <small>MRI scanning facility</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="surgery"
                checked={formData.requiredFacilities.surgery}
                onChange={handleFacilityChange}
              />
              <span>
                <strong>Surgery</strong>
                <small>Surgical facility</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="cardiacUnit"
                checked={
                  formData.requiredFacilities.cardiacUnit
                }
                onChange={handleFacilityChange}
              />
              <span>
                <strong>Cardiac Unit</strong>
                <small>Cardiac care facility</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="dialysis"
                checked={formData.requiredFacilities.dialysis}
                onChange={handleFacilityChange}
              />
              <span>
                <strong>Dialysis</strong>
                <small>Dialysis facility</small>
              </span>
            </label>
          </div>
        </section>

        {/* Required Doctors */}
        <section className="transfer-section">
          <h3>Required Specialists</h3>

          <p className="section-description">
            Select the specialists required at the destination
            hospital.
          </p>

          <div className="checkbox-grid">
            <label className="checkbox-card">
              <input
                type="checkbox"
                name="cardiologist"
                checked={
                  formData.requiredDoctors.cardiologist
                }
                onChange={handleDoctorChange}
              />
              <span>
                <strong>Cardiologist</strong>
                <small>Heart specialist</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="neurologist"
                checked={
                  formData.requiredDoctors.neurologist
                }
                onChange={handleDoctorChange}
              />
              <span>
                <strong>Neurologist</strong>
                <small>Neurological specialist</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="neurosurgeon"
                checked={
                  formData.requiredDoctors.neurosurgeon
                }
                onChange={handleDoctorChange}
              />
              <span>
                <strong>Neurosurgeon</strong>
                <small>Brain and spine specialist</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="pulmonologist"
                checked={
                  formData.requiredDoctors.pulmonologist
                }
                onChange={handleDoctorChange}
              />
              <span>
                <strong>Pulmonologist</strong>
                <small>Respiratory specialist</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="traumaSpecialist"
                checked={
                  formData.requiredDoctors.traumaSpecialist
                }
                onChange={handleDoctorChange}
              />
              <span>
                <strong>Trauma Specialist</strong>
                <small>Trauma and emergency care</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="surgeon"
                checked={formData.requiredDoctors.surgeon}
                onChange={handleDoctorChange}
              />
              <span>
                <strong>Surgeon</strong>
                <small>Surgical specialist</small>
              </span>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                name="nephrologist"
                checked={
                  formData.requiredDoctors.nephrologist
                }
                onChange={handleDoctorChange}
              />
              <span>
                <strong>Nephrologist</strong>
                <small>Kidney specialist</small>
              </span>
            </label>
          </div>
        </section>

        {/* Ambulance Requirement */}
        <section className="transfer-section">
          <h3>Ambulance Requirement</h3>

          <label className="checkbox-card ambulance-option">
            <input
              type="checkbox"
              name="ambulanceRequired"
              checked={formData.ambulanceRequired}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  ambulanceRequired: event.target.checked,
                }))
              }
            />

            <span>
              <strong>Request an ambulance</strong>
              <small>
                eZResQ will look for a suitable available ambulance
                for this transfer.
              </small>
            </span>
          </label>
        </section>

        {/* Additional Notes */}
        <section className="transfer-section">
          <h3>Additional Information</h3>

          <div className="form-group">
            <label htmlFor="notes">
              Transfer Notes / Requirements
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleBasicChange}
              placeholder="Enter any additional requirements for the transfer..."
              rows="4"
            />
          </div>
        </section>

        {/* Actions */}
        <div className="transfer-actions">
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting
              ? "Finding Hospitals..."
              : "Find Suitable Hospital"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientTransferForm;
```
