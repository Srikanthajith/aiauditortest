module.exports = class mysqli {
    async mysqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }

    async sfqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }
};


var mysqliq = []
//user
mysqliq['select_users'] = 'SELECT * FROM users';
mysqliq['insert_into_expense'] = 'insert into expenses (sheet_id,date,transaction,num,name) values (?,?,?,?,?)';
mysqliq['insert_into_expensedetails'] = 'insert into expenses_details (expense_id,description,account,amount,type) values (?,?,?,?,?)';
mysqliq['update_final_expense'] = 'update expenses set total_credits = ?, total_debits = ? where id = ?';
