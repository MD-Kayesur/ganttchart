






import React, { useState, useRef, useEffect, FC, MouseEvent, useCallback } from 'react';


interface Position {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

interface DraggableCardProps {
    children?: React.ReactNode;
    initialWidth?: number;
    initialHeight?: number;
}

type InteractionType = 'drag' | 'resize' | null;


const DraggableCard: FC<DraggableCardProps> = ({ children, initialWidth = 300, initialHeight = 200 }) => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [size, setSize] = useState<Size>({ width: initialWidth, height: initialHeight });

    const [interaction, setInteraction] = useState<InteractionType>(null);

    const startInteractionPosition = useRef<Position>({ x: 0, y: 0 });
    const startCardPosition = useRef<Position>({ x: 0, y: 0 });
    const startCardSize = useRef<Size>({ width: 0, height: 0 });

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>, type: InteractionType): void => {
        e.preventDefault();
        e.stopPropagation();

        if (type === null) return;

        setInteraction(type);

        startInteractionPosition.current = { x: e.clientX, y: e.clientY };
        startCardPosition.current = { x: position.x, y: position.y };
        startCardSize.current = { width: size.width, height: size.height };

        document.body.style.cursor = type === 'drag' ? 'grabbing' : 'se-resize';
    };

    const handleMouseMove = useCallback((e: globalThis.MouseEvent): void => {
        if (!interaction) return;

        const deltaX: number = e.clientX - startInteractionPosition.current.x;
        const deltaY: number = e.clientY - startInteractionPosition.current.y;

        if (interaction === 'drag') {
            const newX: number = startCardPosition.current.x + deltaX;
            const newY: number = startCardPosition.current.y + deltaY;
            setPosition({ x: newX, y: newY });

        } else if (interaction === 'resize') {
            const newWidth: number = Math.max(100, startCardSize.current.width + deltaX);
            const newHeight: number = Math.max(50, startCardSize.current.height + deltaY);
            setSize({ width: newWidth, height: newHeight });
        }
    }, [interaction]);

    const handleMouseUp = useCallback((): void => {
        if (interaction) {
            setInteraction(null);
            document.body.style.cursor = 'default';
        }
    }, [interaction]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);


    const isInteracting = interaction !== null;

    const cardClasses: string = `
        absolute   rounded-lg bg-white  
        select-none
        ${isInteracting ? 'z-50' : 'z-10'}
    `;

    const dynamicStyle: React.CSSProperties = {
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transition: isInteracting ? 'none' : 'transform 0.1s ease-out, width 0.3s ease-out, height 0.3s ease-out',
        minWidth: '600px',
        minHeight: '450px',
    };

    const dragCursorClass = interaction === 'drag' ? 'cursor-grabbing' : 'cursor-grab';

    return (
        <div
            className={cardClasses}
            style={dynamicStyle}
            onMouseDown={(e) => handleMouseDown(e, 'drag')}
        >
            <div className={` w-full   h-full overflow-auto ${dragCursorClass}`}>
                {children || <p className="text-xl font-bold">Resizable & Draggable Card! 📐</p>}
            </div>

            {/* <div
                className={`
                    absolute bottom-0 right-0 w-4 h-4 
                    bg-blue-500 opacity-20 hover:opacity-100 transition-opacity rounded-br-lg
                    cursor-se-resize
                `}
                title="Resize"
                onMouseDown={(e) => handleMouseDown(e, 'resize')}
            /> */}
        </div>
    );
};

export default DraggableCard;