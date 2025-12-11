// // 创建页面
// function createPages({ actions  }) {
//     const { createPage  } = actions;
// // 获取模板的绝对路径
// const personTemplate = require.resolve("./src/temolates/person.js");
// // 获取模板所需要的数据
// const persons = [
//     { slug: "zhangsan", name: "张三", age: 18 },
//     { slug: "lisi", name: "李四", age: 28 },  
//     { slug: "wangwu", name: "王五", age: 38 },
// ];

// // 根据模板和数据创建页面
// persons.forEach((person)=>{
//     createPage({
//         // 模板绝对路径
//         component: personTemplate,

//         // 访问地址
//         path: `/person/${person.slug}`,
//         // 传递给模板的数据
//         context: person
//     })

// })

// }


// exports.createPages = createPages;


exports.sourceNodes = async (...args) => {
  await require('./gatsby/sourceCurrency.js').sourceNodes(...args);
  await require('./gatsby/sourceRates.js').sourceNodes(...args);
};

exports.createPages = async (...args) => {
  await require('./gatsby/createPages.js').createPages(...args);
};











