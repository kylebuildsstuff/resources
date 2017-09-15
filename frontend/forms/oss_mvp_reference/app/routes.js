// Routes
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'loginPage',
      getComponent(location, cb) {
        System.import('containers/LoginPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/account',
      name: 'accountPage',
      indexRoute: { onEnter: (nextState, replace) => replace('/account/auto') },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/AccountPage/reducer'),
          // System.import('containers/AccountPage/sagas'),
          System.import('containers/AccountPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          reducer,
          // sagas,
          component,
        ]) => {
          injectReducer('accountPage', reducer.default);
          // injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/account/vehicles/:vehicle_id/replace',
          name: 'accountVehicleSubPage',
          getComponent(location, cb) {
            System.import('containers/AccountVehicleSubPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: '/account/vehicles/replace', // from KnowledgeBase
          name: 'accountVehicleSubPage',
          getComponent(location, cb) {
            System.import('containers/AccountVehicleSubPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: '/account/change-your-address', // from KnowledgeBase
          name: 'changeAddressPage',
          getComponent(location, cb) {
            System.import('containers/ChangeAddressPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: '/account/billing', // from KnowledgeBase
          name: 'accountBillingPage',
          getComponent(location, cb) {
            System.import('containers/AccountBillingPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: '/account/claims',
          name: 'accountClaimsPage',
          getComponent(location, cb) {
            System.import('containers/AccountClaimsPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: '/account/vehicles/add-vehicle',
          name: 'accountVehicleAddPage',
          getComponent(location, cb) {
            System.import('containers/AccountVehicleAddPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: '/account/vehicles/success',
          name: 'accountFormSubmitSuccess',
          getComponent(location, cb) {
            System.import('containers/AccountFormSubmitSuccessPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: '/account/manage',
          name: 'accountManagePage',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/AccountManagePage/reducer'),
              System.import('containers/AccountManagePage/sagas'),
              System.import('containers/AccountManagePage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('accountManage', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/account/auto',
          name: 'accountAutoPage',
          getComponent(location, cb) {
            System.import('containers/AccountAutoPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: '/account/property',
          name: 'accountPropertyPage',
          getComponent(location, cb) {
            System.import('containers/AccountPropertyPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
      ],
    }, {
      path: '/registered',
      name: 'registeredPage',
      getComponent(location, cb) {
        System.import('components/RegisteredPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/logout',
      name: 'logoutPage',
      getComponent(location, cb) {
        System.import('containers/LogoutPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/kb',
      name: 'knowledgeBasePage',
      indexRoute: { onEnter: (nextState, replace) => replace('/kb/home') },
      getComponent(location, cb) {
        System.import('containers/KnowledgeBasePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/kb/home',
          name: 'kbHome',
          getComponent(location, cb) {
            System.import('containers/KnowledgeBasePage/KbHome')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: '/kb/are-you-moving',
          name: 'areYouMoving',
          getComponent(location, cb) {
            System.import('containers/KnowledgeBasePage/AreYouMoving')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: '/kb/buying-a-car',
          name: 'buyingACar',
          getComponent(location, cb) {
            System.import('containers/KnowledgeBasePage/buyingACar')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: '/kb/trading-in-a-car',
          name: 'tradingInACar',
          getComponent(location, cb) {
            System.import('containers/KnowledgeBasePage/TradingInACar')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: '/kb/adding-a-driver',
          name: 'addingADriver',
          getComponent(location, cb) {
            System.import('containers/KnowledgeBasePage/AddingADriver')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: '/kb/changing-your-coverage',
          name: 'changingYourCoverage',
          getComponent(location, cb) {
            System.import('containers/KnowledgeBasePage/ChangingYourCoverage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: '/kb/need-documents',
          name: 'needDocuments',
          getComponent(location, cb) {
            System.import('containers/KnowledgeBasePage/NeedDocuments')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: '/kb/cancel-your-policy',
          name: 'cancelYourPolicy',
          getComponent(location, cb) {
            System.import('containers/KnowledgeBasePage/CancellingYourPolicy')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        }, {
          path: '/kb/selling-a-car',
          name: 'sellingACar',
          getComponent(location, cb) {
            System.import('containers/KnowledgeBasePage/SellingACar')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
      ],
    }, {
      path: '/contact',
      name: 'contactPage',
      getComponent(location, cb) {
        System.import('containers/ContactPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/faqs',
      name: 'frequentQuestionsPage',
      getComponent(location, cb) {
        System.import('containers/FrequentQuestionsPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/check-email',
      name: 'passwordResetEmailSentPage',
      getComponent(location, cb) {
        System.import('components/PasswordResetEmailSentPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/verify/:token',
      name: 'activateUserPage',
      getComponent(location, cb) {
        System.import('containers/ActivateUserPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/register',
      name: 'registerPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/RegisterPage/reducer'),
          System.import('containers/RegisterPage/sagas'),
          System.import('containers/RegisterPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('registerPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/reset-password',
      name: 'resetPasswordPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ResetPasswordPage/reducer'),
          System.import('containers/ResetPasswordPage/sagas'),
          System.import('containers/ResetPasswordPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('resetPasswordPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/account/manage/reset/:uuid/:token',
      name: 'resetPasswordConfirmPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ResetPasswordConfirmPage/reducer'),
          System.import('containers/ResetPasswordConfirmPage/sagas'),
          System.import('containers/ResetPasswordConfirmPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('resetPasswordConfirmPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/maintenance',
      name: 'maintenancePage',
      getComponent(location, cb) {
        System.import('containers/MaintenancePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/error',
      name: 'systemErrorPage',
      getComponent(location, cb) {
        System.import('containers/SystemErrorPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
