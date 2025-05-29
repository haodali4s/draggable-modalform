import { ModalForm } from "@ant-design/pro-components";
import React, { useCallback } from "react";
import type { ComponentProps } from "react";
interface DraggableModalProps {
  children: React.ReactElement<ComponentProps<typeof ModalForm>>;
}

const DraggableModal: React.FC<DraggableModalProps> = (props) => {
  const { children } = props;

  const draggable = useCallback((node: HTMLDivElement) => {
    {
      let drag = false;
      let originX = 0;
      let originY = 0;
      let startX = 0;
      let startY = 0;
      let maxX = [-Infinity, Infinity];
      let maxY = [-Infinity, Infinity];
      let animationFrame: number | undefined;
      const canBeDragged = (e: MouseEvent) => {
        const { top } = node.getBoundingClientRect();
        const regex = /(-?\d+\.?\d*)/g;
        const style = getComputedStyle(node.children[0]);
        // const availableLeft =
        //   parseFloat(style.paddingLeft ?? style.paddingLeft.match(regex)[0]) +
        //   left;
        const availableTop =
          parseFloat(
            style.paddingTop ?? (style.paddingTop as string).match(regex)![0]
          ) + top;
        // const availableRight =
        //   right -
        //   parseFloat(
        //     style.paddingRight ?? style.paddingRight!.match(regex)![0],
        //   );
        // const availableBottom =
        //   bottom -
        //   parseFloat(
        //     style.paddingBottom ?? style.paddingBottom!.match(regex)![0],
        //   );

        return (
          // e.clientX > left - 10 &&
          // e.clientX < right + 10 &&
          e.clientY > top &&
          // e.clientY < bottom + 10 &&
          !(
            // e.clientX > availableLeft + 10 &&
            // e.clientX < availableRight - 10 &&
            (e.clientY > availableTop)
            // e.clientY < availableBottom - 10
          )
        );
      };
      const dragOver = () => {
        if (drag) {
          drag = false;
          node.style.userSelect = "auto";
          const regex = /(-?\d+\.?\d*)/g;
          const matches = node.style.transform.match(regex);
          if (matches && matches.length > 0) {
            originX += parseFloat(matches[0]);
            originY += parseFloat(matches[1]);
          }
          node.style.cursor = "default";
          node.style.left = `${originX}px`;
          node.style.top = `${originY}px`;
          node.style.transform = "";
          animationFrame && cancelAnimationFrame(animationFrame);
        }
      };

      if (node) {
        node.onmousedown = (e) => {
          if (window.innerHeight > node.offsetHeight + 100 && canBeDragged(e)) {
            if (e.buttons === 1) {
              drag = true;
              startX = e.clientX;
              startY = e.clientY;
              const { left, top, right, bottom } = node.getBoundingClientRect();
              maxX = [-left, window.innerWidth - right];
              maxY = [-top, window.innerHeight - bottom];
            }
          }
        };
        document.onmousemove = (e) => {
          if (canBeDragged(e)) {
            node.style.cursor = "move";
          } else {
            if (!drag) node.style.cursor = "default";
          }
          if (drag && e.buttons === 1) {
            node.style.userSelect = "none";
            let xMove = e.clientX - startX;
            let yMove = e.clientY - startY;
            if (xMove < maxX[0]) {
              xMove = maxX[0];
            }
            if (xMove > maxX[1]) {
              xMove = maxX[1];
            }
            if (yMove < maxY[0]) {
              yMove = maxY[0];
            }
            if (yMove > maxY[1]) {
              yMove = maxY[1];
            }
            animationFrame = requestAnimationFrame(() => {
              node.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
          }
        };
        node.onmouseup = dragOver;
        // document.onmouseleave = dragOver;
        window.onblur = dragOver;
      }
    }
  }, []);
  if (!React.isValidElement(children) || children.type !== ModalForm) {
    console.error("Children must be a ModalForm component");
    return null;
  }

  return React.cloneElement(children, {
    modalProps: {
      ...children.props.modalProps,
      modalRender: (content) => (
        <div style={{ width: "100%", position: "absolute" }} ref={draggable}>
          {content}
        </div>
      ),
    },
  });
};

export default DraggableModal;
