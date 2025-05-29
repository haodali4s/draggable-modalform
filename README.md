# draggable-modalform

这是基于antdPro中的ModalForm封装的一个可以拖动的ModalForm。

## 安装
```bash
npm install draggable-modalform
```

## 使用
```tsx
import DraggableModalForm from 'draggable-modalform';
import {ModalForm} from 'antd';

return (
    <DraggableModalForm>
        <ModalForm ...yourProps> </ModalForm>
    </DraggableModalForm>
)
```
直接用DraggableModalForm包裹ModalForm即可。
## 注意事项
1. 目前只支持antdPro中的ModalForm，其他的ModalForm可能会有问题。

