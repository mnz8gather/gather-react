为了避免服务器收到不可预知的请求，对任何用户输入的作为 URI 部分的内容你都需要用 encodeURIComponent 进行转义。比如，一个用户可能会输入"`Thyme &time=again`"作为`comment`变量的一部分。如果不使用 encodeURIComponent 对此内容进行转义，服务器得到的将是`comment=Thyme%20&time=again`。请注意，"&"符号和"="符号产生了一个新的键值对，所以服务器得到两个键值对（一个键值对是`comment=Thyme`，另一个则是`time=again`），而不是一个键值对。

[encodeURIComponent() 示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#%E7%A4%BA%E4%BE%8B)
