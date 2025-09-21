// Simplified example of a draggable widget item
import { useDrag } from 'react-dnd';
import { WIDGET_CATALOG } from '../widgetTypes';

const WidgetItem = ({ widget }) => {
  // 1. Define the drag source
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WIDGET', // The type used by the DropTarget
    item: { id: widget.id, name: widget.name }, // Data passed on drop
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', padding: '10px', margin: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
      {widget.icon} {widget.name}
    </div>
  );
};

const WidgetLibrary = () => (
  <div>
    <h4>Widget Library</h4>
    {WIDGET_CATALOG.map(widget => (
      <WidgetItem key={widget.id} widget={widget} />
    ))}
  </div>
);

export default WidgetLibrary;