const steps = ['Buses', 'Seats', 'Details', 'Ticket'];

export default function StepTrack({ current }) {
  return (
    <div className="step-track flex-wrap">
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const state = stepNum < current ? 'done' : stepNum === current ? 'active' : '';
        return (
          <div key={label} className="d-flex align-items-center gap-2">
            <div className="d-flex flex-column align-items-center gap-1">
              <div className={`step-dot ${state}`}>{stepNum}</div>
              <span className="step-label">{label}</span>
            </div>
            {idx < steps.length - 1 && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
}
