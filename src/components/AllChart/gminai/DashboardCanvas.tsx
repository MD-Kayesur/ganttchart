DashboardCanvasimport { useDrop } from 'react-dnd';
import DashboardWidget from './DashboardWidget';

const DashboardCanvas = ({ widgets, onWidgetClick, onDropWidget, selectedWidgetId }) => {
  // 2. Define the drop target
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'WIDGET',
    drop: (item, monitor) => {
      // Handle the drop event
      if (monitor.didDrop()) return;
      onDropWidget(item.id); // Call the function to add the widget to state
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={{ minHeight: '80vh', border: isOver ? '2px dashed #2196F3' : '2px dashed transparent' }}>
      {widgets.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>Drag and drop a widget here to begin.</p>}
      
      {/* RENDER THE WIDGETS */}
      {widgets.map(widget => (
        <DashboardWidget 
          key={widget.id} 
          widget={widget} 
          onClick={() => onWidgetClick(widget.id)}
          isSelected={widget.id === selectedWidgetId}
        />
      ))}
    </div>
  );
};

export default DashboardCanvas;