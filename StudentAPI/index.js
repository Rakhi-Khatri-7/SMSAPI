const express = require('express');
const cors = require('cors');
const Pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json('WELCOME TO STUDENT API');
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/students',async(req,res)=>{
    try{
        const result = await Pool.query('select * from student');
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
});

app.get('/gettotalstd',async(req,res)=>{
    try{
        const result = await Pool.query('select count(ID) from student');
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
});


app.get('/50',async(req,res)=>{
    try{
        const result = await Pool.query
        (` select jh.*, e.first_name, e.last_name, j.job_title, c.country_name
            from job_history jh
            join employees e on jh.employee_id = e.employee_id
            join jobs j on jh.job_id = j.job_id
            join departments d on jh.department_id = d.department_id
            join locations l on d.location_id = l.location_id
            join countries c on l.country_id = c.country_id;
            `);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});

app.get('/regxcoun',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select r.region_name, c.country_name, 
            l.city from regions r join countries c 
            on r.region_id = c.region_id join locations l
            on c.country_id = l.country_id`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
});


app.get('/counxloc',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select l.city, c.country_name, r.region_name from locations l 
         join countries c on l.country_id = c.country_id join regions r ON c.region_id = r.region_id`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }

});


app.get('/counxreg',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select l.city, c.country_name, r.region_name
          from locations l
          join countries c on l.country_id = c.country_id
          join regions r on c.region_id = r.region_id
        `);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/dept',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select d.department_name, e.first_name, e.last_name, l.city
            from departments d
            join employees e on d.department_id = e.department_id
            join locations l on d.location_id = l.location_id
        `);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/emp',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.first_name, e.last_name, d.department_name, l.city, c.country_name
from employees e
join departments d on e.department_id = d.department_id
join locations l on d.location_id = l.location_id
join countries c on l.country_id = c.country_id;
`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/empxmdl',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.employee_id, e.first_name, e.last_name,
       m.first_name as manager_first_name, m.last_name as manager_last_name,
       d.department_name, l.city
from employees e
left join employees m on e.manager_id = m.employee_id
join departments d on e.department_id = d.department_id
join locations l on d.location_id = l.location_id;
`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/empxjtdl',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.first_name, e.last_name, j.job_title, d.department_name, l.city
from employees e
join jobs j on e.job_id = j.job_id
join departments d on e.department_id = d.department_id
join locations l on d.location_id = l.location_id;
`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/empxjtdmanager',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.first_name, e.last_name, j.job_title, d.department_name,
       m.first_name as manager_first_name, m.last_name as manager_last_name
from employees e
join jobs j on e.job_id = j.job_id
join departments d on e.department_id = d.department_id
left join employees m on e.manager_id = m.employee_id;

`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/empxjtdmanagerloc',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.first_name, e.last_name, j.job_title, d.department_name,
       m.first_name as manager_first_name, m.last_name as manager_last_name,
       l.city
from employees e
join jobs j on e.job_id = j.job_id
join departments d on e.department_id = d.department_id
left join employees m on e.manager_id = m.employee_id
join locations l on d.location_id = l.location_id;

`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});

app.get('/countries',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select country_name
from countries
where region_id = 1;

`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/departments',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select d.department_name, l.city
from departments d
join locations l on d.location_id = l.location_id
where l.city like 'n%';

`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/62',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.first_name, e.last_name
from employees e
where e.department_id in (
    select d.department_id
    from departments d
    join employees m on d.manager_id = m.employee_id
    where m.commission_pct > 0.15
);
`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/63',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select distinct j.job_title
from employees e
join jobs j on e.job_id = j.job_id
where e.employee_id in (
    select distinct manager_id
    from employees
    where manager_id is not null
);


`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/64',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select l.postal_code
from locations l
join countries c on l.country_id = c.country_id
join regions r on c.region_id = r.region_id
where lower(r.region_name) = 'asia';


`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/65',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select distinct d.department_name
from departments d
join employees e on d.department_id = e.department_id
where e.commission_pct < (
    select avg(commission_pct)
    from employees
    where commission_pct is not null
);


`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/66',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select j.job_title
            from employees e
            join jobs j on e.job_id = j.job_id
            where e.salary > (
            select avg(salary)
            from employees
            where department_id = e.department_id
            );


`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});



app.get('/67',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select employee_id
            from employees
            where department_id is null;`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/68',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.first_name, e.last_name
            from employees e
            join job_history jh on e.employee_id = jh.employee_id
            group by e.employee_id, e.first_name, e.last_name
            having count(distinct jh.job_id) > 1;`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/69',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select d.department_name, count(e.employee_id) as employee_count
            from departments d
            left join employees e on d.department_id = e.department_id
            group by d.department_name;`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/70',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select j.job_title, sum(e.salary) as total_salary
            from jobs j
            join employees e on j.job_id = e.job_id
            group by j.job_title;`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/71',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select d.department_name, avg(e.commission_pct) as average_commission
            from departments d
            join employees e on d.department_id = e.department_id
            group by d.department_name;`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/72',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select c.country_name, max(e.salary) as max_salary
            from employees e
            join departments d on e.department_id = d.department_id
            join locations l on d.location_id = l.location_id
            join countries c on l.country_id = c.country_id
            group by c.country_name;`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/73',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select j.job_title, d.department_name, e.first_name, e.last_name, jh.start_date
            from job_history jh
            join jobs j on jh.job_id = j.job_id
            join employees e on jh.employee_id = e.employee_id
            join departments d on jh.department_id = d.department_id
            where jh.start_date >= '1993-01-01' and jh.end_date <= '1997-08-31';`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/74',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select c.country_name, l.city, count(distinct d.department_id) as department_count
            from countries c
            join locations l on c.country_id = l.country_id
            join departments d on l.location_id = d.location_id
            join employees e on d.department_id = e.department_id
            group by c.country_name, l.city
            having count(e.employee_id) >= 2;`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/75',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.first_name, e.last_name, j.job_title, jh.start_date, jh.end_date
            from employees e
            join job_history jh on e.employee_id = jh.employee_id
            join jobs j on jh.job_id = j.job_id
            where e.commission_pct is null;`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/76',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select
            e.employee_id, 
            e.first_name, 
            e.last_name, 
            c.country_name
            from 
                employees e
            join
                departments d on e.department_id = d.department_id
            join
                locations l on d.location_id = l.location_id
            join
                countries c on l.country_id = c.country_id;
        `);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/77',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.first_name, e.last_name, e.salary, e.department_id
            from employees e
            where e.salary = (
            select min(salary)
            from employees
            where department_id = e.department_id
        );


`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/78',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select * from employees
            where salary = (
                select distinct salary from (
                    select salary, dense_rank() over(order by salary desc) as rank
                    from employees
                ) as ranked
                where rank = 3
            );`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/79',async(req,res)=>{
    try{
        const result = await Pool.query
        (`select e.employee_id, e.first_name, e.last_name, e.salary
            from employees e
            join departments d on e.department_id = d.department_id
            where e.salary > (
            select avg(salary)
            from employees
            )
            and e.department_id in (
                select distinct department_id
                from employees
                where first_name like '%j%' or last_name like '%j%'
            );`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});


app.get('/80',async(req,res)=>{
    try{
        const result = await Pool.query
        (` select e.first_name, e.last_name, e.employee_id, j.job_title
            from employees e
            join jobs j on e.job_id = j.job_id
            join departments d on e.department_id = d.department_id
            join locations l on d.location_id = l.location_id
            where lower(l.city) = 'toronto';`);
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Error:err.message});
    }
    
});







const PORT = process.env.PORT;
app.listen(PORT,() =>{
    console.log(`Connected Successfully....Running on PORT ${PORT}`);
});