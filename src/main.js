import Vue from 'vue';
import App from './components/App';
import './styles/main.scss';

if (process.env.NODE_ENV !== 'production') {
    console.log('Development mode');
}

new Vue({
    el: '#app',
    render: h => h(App),
});