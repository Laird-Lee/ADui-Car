import _ from 'lodash';
import axios from 'axios';
import { HttpMethod } from '@/enums';
import { message as antMessage } from 'ant-design-vue';

type RequestOptions = {
  url: string;
  method: HttpMethod;
  params?: any;
  data?: any;
};

function useRequest(delay = 0) {
  const data = ref<unknown>(null);
  const err = ref<unknown>(null);
  const loading = ref(false);
  const debouncedRequest = _.debounce(request, delay);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.params) {
        for (const key in config.params) {
          if (Object.prototype.hasOwnProperty.call(config.params, key)) {
            config.params[key] = encodeURIComponent(config.params[key]);
          }
        }
        if (config.method === HttpMethod.GET) {
          config.params = _.assign(config.params, { _t: new Date().getTime() });
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;
        let message = '发生了一个错误';

        // 根据不同的状态码显示不同的提示信息
        switch (status) {
          case 400:
            message = '请求错误：Bad Request';
            break;
          case 401:
            message = '未授权：Unauthorized';
            break;
          case 403:
            message = '禁止访问：Forbidden';
            break;
          case 404:
            message = '资源不存在：Not Found';
            break;
          case 500:
            message = '服务器错误：Internal Server Error';
            break;
          // 可以根据需要添加更多状态码的处理
          default:
            message = '发生了一个错误';
        }
        antMessage.error(message);
      } else {
        console.error('网络错误或请求超时');
      }
      return Promise.reject(error);
    }
  );

  async function request(options: RequestOptions) {
    loading.value = true;
    try {
      const response = await axiosInstance(options);
      data.value = response.data;
    } catch (e) {
      err.value = e;
    } finally {
      loading.value = false;
    }
  }

  return { data, err, loading, debouncedRequest };
}

export { useRequest };
