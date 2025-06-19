import { ModalForm } from "@ant-design/pro-components";
// import Test from "../dist/draggableModal.es.js";
import Test from "./DraggableModal";
const App = () => {
  return (
    <div style={{ padding: "20px" }} className="h-[800px]">
      <Test>
        <ModalForm title="draggable_modal" trigger={<div>111</div>}>
          <div style={{ height: "300px" }}>example</div>
        </ModalForm>
      </Test>
      <ModalForm></ModalForm>
      <h1>欢迎使用DraggableModal</h1>
    </div>
  );
};

export default App;
