const conn=require('./connection');
const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');



app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/register.html')
});


app.post('/',(req,res)=>{

    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;
    const department=req.body.department;
    const age=req.body.age;


    conn.connect((error)=>{

        if(error) throw error;

        const sql="insert into student (firstName,lastName,email,password,department,age) values ?";
        const values=[
            [firstName,lastName,email,password,department,age]
        ];

        conn.query(sql,[values],function(error,result){
            if(error) throw error;

            res.redirect('/students');
           // res.send('Student Registered Successfully'+result.insertId);
        })

    })


})

app.get('/students',(req,res)=>{
    conn.connect((error)=>{
        if(error) throw error;
        const sql='select * from student';
        conn.query(sql,(error,result)=>
        {
            if (error) {
              return  error;
            }

           res.render(__dirname+"/students",{students:result})

        })

    })
})


app.get('/delete-student',(req,res)=>{

    conn.connect((error)=>{
        if(error) throw error;
        const sql='delete from student where id=?';

        const id=req.query.id;
        conn.query(sql,[id],(error,result)=>
        {
            if (error) throw  error;
            
            res.redirect ('/students');

        })

    })
})





app.put('/update-student',(req,res)=>{

    conn.connect((error)=>{
        if(error) throw error;
        const sql='select * from student where id=?';

        const id=req.query.id;
        conn.query(sql,[id],(error,result)=>
        {
            if (error) throw  error;
           res.render(__dirname,'/update-student',{students:result})

        })

    })
})

app.post( '/update-student' ,(req,res)=>{


    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;
    const department=req.body.department;
    const age=req.body.age;

    const id=req.body.id;


    conn.connect((error)=>{
        if(error) throw error;
        const sql='update student set firstName=?,lastName=?,email=?,password=?,department=?,age=? where id=?';

        conn.query(sql,[firstName,lastName,email,password,department,age],(error,result)=>
        {
            if (error) throw  error;

            res.redirect('/students')

        })

    });
    

});


app.get('/search-students',(req,res)=>{

    conn.connect((error)=>{
        if(error) throw error;
        const sql='select * from student';
        conn.query(sql,(error,result)=>
        {
           if(error) throw error;

           res.render(__dirname+"/search-students",{students:result})

        })

    })

});

app.get('/search', (req,res)=>{

    
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;
    const department=req.body.department;
    const age=req.body.age;

    conn.connect((error)=>{
        if(error) throw error;

        const sql="select * from student where firstName LIKE '%"+firstName+"%' AND email LIKE '%"+email+"%' AND department LIKE '%"+department+"%' AND age LIKE '%"+age+"%' ";
        conn.query(sql,(error,result)=>{
            if(error) throw error;
            res.render(__dirname+"/search-students",{students:result});

        })
    });

})


app.listen(4000);

