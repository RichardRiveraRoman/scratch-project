// HistoryStyles.js
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  legend: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  legendCircle: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  legendText: {
    fontSize: '12px',
    color: '#555',
  },
  historyContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    width: '100%',
    position: 'relative',
  },
  circlesContainer: {
    marginRight: '10px',
  },
  circle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
  },
  content: {
    flexGrow: 1,
  },
  ratio: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000',
  },
  day: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  date: {
    fontSize: '14px',
    color: '#888',
  },
  buttonContainer: {
    display: 'flex',
    gap: '5px',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default styles;
