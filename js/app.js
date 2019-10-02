(function(){
// model
var Task = Backbone.Model.extend({
    // デフォルト値を設定できる
    defaults:{
        title: 'do something',
        completed: false
    },
    validate: function(attrs){
        if (_.isEmpty(attrs.title)) {
            return "title must not be empty!"
        }
    },
    toggle: function(){
        this.set('completed', !this.get('completed'));
    }
});
var task = new Task({
    completed: true
});

// view
//DOM要素を作っていく
var TaskView = Backbone.View.extend({
    // 以下は <li class="liClass" id = "liId"></li> と同じ
    tagName: 'li',
    // className: 'liClass',
    // id: 'liId',

    // テンプレートを使って中身を作る
    template: _.template($('#task-template').html()),  //
    //中身を渡さないといけないのでrenderというfunctionを指定する。
    render: function(){
        console.log(this.model.toJSON());
        var template = this.template( this.model.toJSON());
        // htmlをテンプレートで入れ替える
        this.$el.html(template);
        return this;
    }

});
// ビューのインスタンスをnewするときはモデルを渡す。
var taskView = new TaskView({ model: task });
console.log(taskView.render().el);
//console.log(taskView.$el);        $をつけるとjQueryのオブジェクトになる


$('body').append(taskView.render().el);
})();