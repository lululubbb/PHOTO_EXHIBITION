## PHOTO_EXHIBITION
### 项目内容
用户上传照片到服务器，并且上传照片的时候不仅仅上载照片图像，还要输入照片的主题、描述、拍摄时间和拍摄地点等信息

在浏览页面可以按照片查询条件如拍摄的地点、时间和主题进行查询，也可顺序或倒序翻看所有照片。同时鼠标悬浮在照片上时可以显示照片的信息如的主题、描述、拍摄时间和拍摄地点，其中可以自动获取含有EXIF数据的照片的拍摄时间和拍摄地点。并且可以点击➕放大图片进行查看

### 项目结构
<pre>
<code class="tree">
PHOTO_EXHIBITION
│  main.py                    -前后端连接，数据库连接，照片上传并保存、根据要检索内容查询数据库
│
├─.idea
│
├─static
│  │  javascript.js           -主要实现上传、检索以及动态获取后端照片数据在前端显示
│  │  style.css               -控制页面样式
│  │
│  └─uploads                  -存储用户上传的图片
│
└─templates
        index.html            -主页面
        search.html           -检索并且浏览照片页面
        upload.html           -上传照片页面
</code>
</pre>

### 环境配置

**安装依赖**

1. 打开命令提示符或终端。
2. 切换到系统的根目录。
3. 输入并执行以下命令来安装必要的依赖包：

```
pip install -r requirements.txt
```

**启动程序**

在系统根目录下，执行以下命令：

```
python main.py
```

成功启动后，使用您的浏览器访问前端页面`http://127.0.0.1:5000`即可进入系统的主界面。

### 效果展示

• 主页：对用户上传照片中拍摄时间最近的八张照片进行轮播展示

• 主页面截图（照片会自动轮播）：

<img width="285" alt="image" src="https://github.com/user-attachments/assets/8f1e5d6b-2d0d-46e5-998a-0d4289e5b9d8">

• 点击左右按钮可以手动切换正在展示的照片：

<img width="286" alt="image" src="https://github.com/user-attachments/assets/bb867e22-596a-432d-b904-dc0e06bb8b69">

• 图片上传界面：用户在此页面上传图片并且输出图片的主题、描述、拍摄时间以及拍摄地点等信息

• 图片上传界面：

<img width="274" alt="image" src="https://github.com/user-attachments/assets/bd006c1e-3444-4c10-a943-fad60cdb40f0">

• 选择文件进行上传，在代码部分已经限制了只能选择图片格式的文件，填写相关信息，其中只有描述不是必填项：

<img width="264" alt="image" src="https://github.com/user-attachments/assets/072aae28-e84b-407f-8281-df1ae07dd35c">

<img width="262" alt="image" src="https://github.com/user-attachments/assets/8f32c21f-73d4-4e29-817b-99b70950bbdb">

• 图片浏览界面：用户在此页面可以浏览所有在网站上上传的图片，并且可以根据日期、照片主题、照片拍摄时间以及照片拍摄地点进行模糊查询符合要求的图片。同时对于显示的照片，将鼠标停留在上方时可以显示该照片的卡片信息，点击➕ 可以实现放大图片

• 图片浏览界面：

<img width="277" alt="image" src="https://github.com/user-attachments/assets/69ce9e5c-9236-4a87-89c1-59919c9ecad3">

• 图片信息卡片（当鼠标靠近时显示卡片信息）：

<img width="322" alt="image" src="https://github.com/user-attachments/assets/e319fb89-f198-4b03-b4a5-6c893cb8dff7">

• 图片放大预览（点击➕ 查看大图）：

<img width="279" alt="image" src="https://github.com/user-attachments/assets/881de614-c0f8-4fa2-bbe4-3439430a1b12">

• 检索功能：

根据拍摄日期检索

<img width="312" alt="image" src="https://github.com/user-attachments/assets/4fe82d8f-1aea-4fcf-ae3c-607d1fa0404f">

根据拍摄地点检索
<img width="285" alt="image" src="https://github.com/user-attachments/assets/918a945e-c357-40b8-b13c-e0774a753a1a">
<img width="285" alt="image" src="https://github.com/user-attachments/assets/30b6270e-7e58-43b2-9153-10d315e7ee84">

<img width="338" alt="image" src="https://github.com/user-attachments/assets/1b135d47-330f-48ec-82aa-9511902dc3b3">

根据照片主题检索

<img width="356" alt="image" src="https://github.com/user-attachments/assets/a798273c-03ad-40c8-9b4e-ff64f8120dca">

• 根据拍摄时间/上传日期进行排序：

升序：

<img width="304" alt="image" src="https://github.com/user-attachments/assets/ce8f8c30-4926-4cb3-85f2-2848e59a2e86">

降序：

<img width="318" alt="image" src="https://github.com/user-attachments/assets/66685bf6-9f80-4f4a-b947-685fc92b1bf4">

• 自动提取照片信息：

对含有EXIF数据的照片进行自动提取照片的拍摄时间以及拍摄地点
但是由于现在的照片对位置信息进行保护，上传的照片中一般无位置信息的数据，但是有的照片含有拍摄时间的数据

 <img width="193" alt="image" src="https://github.com/user-attachments/assets/35364140-8cd8-41e1-a464-20210403d9f1">
<img width="187" alt="image" src="https://github.com/user-attachments/assets/6f9593f2-6b43-4380-bdbe-6ca212c3925e">


