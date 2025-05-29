import { ModalForm } from "@ant-design/pro-components";
import Test from "../dist/draggableModal.es.js";
const App = () => {
  return (
    <div style={{ padding: "20px" }} className="h-[800px]">
      <Test>
        <ModalForm title="dadada" trigger={<div>111</div>}></ModalForm>
      </Test>
      <ModalForm></ModalForm>
      <h1>欢迎使用DraggableModal</h1>
    </div>
  );
};

export default App;
