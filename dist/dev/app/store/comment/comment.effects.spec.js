"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_effects_1 = require("./comment.effects");
var CommentActions = require("./comment.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Comment Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new comment_effects_1.CommentEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'getComments',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CommentActions.Load.Type,
                parentObject: { objectType: 'collection', objectId: 1 }
            },
            serviceMethod: {
                name: 'getCommentsFor',
                expectedArguments: [{ objectType: 'collection', objectId: 1 }],
                returnsObservableOf: { items: [{ some: 'comment' }], pagination: {} }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'comment',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ items: [{ some: 'comment' }], pagination: {} }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'formSubmit',
            comment: 'for EDIT',
            state: [
                { storeSectionName: 'comment', propertyName: 'formMode', value: 'EDIT' },
                { storeSectionName: 'comment', propertyName: 'commentBeingEdited', value: { old: 'comment' } }
            ],
            effectsInstantiator: instantiator,
            inputAction: {
                type: CommentActions.FormSubmit.Type,
                parentObject: { objectType: 'collection', objectId: 1 },
                comment: { some: 'comment' }
            },
            serviceMethod: {
                name: 'editComment',
                expectedArguments: [{ objectType: 'collection', objectId: 1 }, { old: 'comment' }],
                returnsObservableOf: { items: [{ some: 'comment' }], pagination: {} }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'comment',
                    methodName: 'formSubmitSuccess',
                    expectedArguments: [{ items: [{ some: 'comment' }], pagination: {} }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'formSubmit',
            comment: 'for ADD',
            state: { storeSectionName: 'comment', propertyName: 'formMode', value: 'ADD' },
            effectsInstantiator: instantiator,
            inputAction: {
                type: CommentActions.FormSubmit.Type,
                parentObject: { objectType: 'collection', objectId: 1 },
                comment: { some: 'comment' }
            },
            serviceMethod: {
                name: 'addCommentTo',
                expectedArguments: [{ objectType: 'collection', objectId: 1 }, { some: 'comment' }],
                returnsObservableOf: { items: [{ some: 'comment' }], pagination: {} }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'comment',
                    methodName: 'formSubmitSuccess',
                    expectedArguments: [{ items: [{ some: 'comment' }], pagination: {} }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'removeComment',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CommentActions.Remove.Type,
                parentObject: { objectType: 'collection', objectId: 1 },
                commentId: 2
            },
            serviceMethod: {
                name: 'removeComment',
                expectedArguments: [{ objectType: 'collection', objectId: 1 }, 2],
                returnsObservableOf: { items: [{ some: 'comment' }], pagination: {} }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'comment',
                    methodName: 'removeSuccess',
                    expectedArguments: [{ items: [{ some: 'comment' }], pagination: {} }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showSnackBarOnRemoveSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CommentActions.RemoveSuccess.Type
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['COMMENTS.DELETE_SUCCESS_TOAST']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'getCounts',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CommentActions.GetCounts.Type,
                parentObject: { some: 'parentObject' }
            },
            serviceMethod: {
                name: 'getCountsFor',
                expectedArguments: [{ some: 'parentObject' }],
                returnsObservableOf: { abc: 1 }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'comment',
                    methodName: 'getCountsSuccess',
                    expectedArguments: [{ abc: 1 }]
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb21tZW50L2NvbW1lbnQuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW1EO0FBQ25ELGtEQUFvRDtBQUNwRCwyRUFBOEY7QUFFOUY7SUFDRSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUksZ0NBQWMsQ0FDdkIsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FDckcsQ0FBQztRQUNKLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxVQUFVLEVBQUUsYUFBYTtZQUN6QixtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUM5QixZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7YUFDeEQ7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUM5RCxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTthQUN0RTtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLFNBQVM7b0JBQ3RCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixpQkFBaUIsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxV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WUFDakMsVUFBVSxFQUFFLFdBQVc7WUFDdkIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSTtnQkFDbkMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTthQUN2QztZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsY0FBYztnQkFDcEIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQztnQkFDN0MsbUJBQW1CLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2FBQ2hDO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsU0FBUztvQkFDdEIsVUFBVSxFQUFFLGtCQUFrQjtvQkFDOUIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDaEM7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTVJRCxvQkE0SUMiLCJmaWxlIjoiYXBwL3N0b3JlL2NvbW1lbnQvY29tbWVudC5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tZW50RWZmZWN0cyB9IGZyb20gJy4vY29tbWVudC5lZmZlY3RzJztcbmltcG9ydCAqIGFzIENvbW1lbnRBY3Rpb25zIGZyb20gJy4vY29tbWVudC5hY3Rpb25zJztcbmltcG9ydCB7IEVmZmVjdHNTcGVjSGVscGVyLCBFZmZlY3RUZXN0UGFyYW1ldGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDb21tZW50IEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogQ29tbWVudEVmZmVjdHMge1xuICAgICAgcmV0dXJuIG5ldyBDb21tZW50RWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdnZXRDb21tZW50cycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBDb21tZW50QWN0aW9ucy5Mb2FkLlR5cGUsXG4gICAgICAgIHBhcmVudE9iamVjdDogeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdnZXRDb21tZW50c0ZvcicsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IGl0ZW1zOiBbeyBzb21lOiAnY29tbWVudCcgfV0sIHBhZ2luYXRpb246IHt9IH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnY29tbWVudCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgaXRlbXM6IFt7IHNvbWU6ICdjb21tZW50JyB9XSwgcGFnaW5hdGlvbjoge30gfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZm9ybVN1Ym1pdCcsXG4gICAgICBjb21tZW50OiAnZm9yIEVESVQnLFxuICAgICAgc3RhdGU6IFtcbiAgICAgICAgeyBzdG9yZVNlY3Rpb25OYW1lOiAnY29tbWVudCcsIHByb3BlcnR5TmFtZTogJ2Zvcm1Nb2RlJywgdmFsdWU6ICdFRElUJyB9LFxuICAgICAgICB7IHN0b3JlU2VjdGlvbk5hbWU6ICdjb21tZW50JywgcHJvcGVydHlOYW1lOiAnY29tbWVudEJlaW5nRWRpdGVkJywgdmFsdWU6IHsgb2xkOiAnY29tbWVudCcgfSB9XG4gICAgICBdLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQ29tbWVudEFjdGlvbnMuRm9ybVN1Ym1pdC5UeXBlLFxuICAgICAgICBwYXJlbnRPYmplY3Q6IHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSB9LFxuICAgICAgICBjb21tZW50OiB7IHNvbWU6ICdjb21tZW50JyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnZWRpdENvbW1lbnQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSB9LCB7IG9sZDogJ2NvbW1lbnQnIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IGl0ZW1zOiBbeyBzb21lOiAnY29tbWVudCcgfV0sIHBhZ2luYXRpb246IHt9IH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnY29tbWVudCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2Zvcm1TdWJtaXRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgaXRlbXM6IFt7IHNvbWU6ICdjb21tZW50JyB9XSwgcGFnaW5hdGlvbjoge30gfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZm9ybVN1Ym1pdCcsXG4gICAgICBjb21tZW50OiAnZm9yIEFERCcsXG4gICAgICBzdGF0ZTogeyBzdG9yZVNlY3Rpb25OYW1lOiAnY29tbWVudCcsIHByb3BlcnR5TmFtZTogJ2Zvcm1Nb2RlJywgdmFsdWU6ICdBREQnIH0sXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBDb21tZW50QWN0aW9ucy5Gb3JtU3VibWl0LlR5cGUsXG4gICAgICAgIHBhcmVudE9iamVjdDogeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH0sXG4gICAgICAgIGNvbW1lbnQ6IHsgc29tZTogJ2NvbW1lbnQnIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdhZGRDb21tZW50VG8nLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSB9LCB7IHNvbWU6ICdjb21tZW50JyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBpdGVtczogW3sgc29tZTogJ2NvbW1lbnQnIH1dLCBwYWdpbmF0aW9uOiB7fSB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2NvbW1lbnQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdmb3JtU3VibWl0U3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IGl0ZW1zOiBbeyBzb21lOiAnY29tbWVudCcgfV0sIHBhZ2luYXRpb246IHt9IH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ3JlbW92ZUNvbW1lbnQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQ29tbWVudEFjdGlvbnMuUmVtb3ZlLlR5cGUsXG4gICAgICAgIHBhcmVudE9iamVjdDogeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH0sXG4gICAgICAgIGNvbW1lbnRJZDogMlxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ3JlbW92ZUNvbW1lbnQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSB9LCAyXSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBpdGVtczogW3sgc29tZTogJ2NvbW1lbnQnIH1dLCBwYWdpbmF0aW9uOiB7fSB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2NvbW1lbnQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdyZW1vdmVTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgaXRlbXM6IFt7IHNvbWU6ICdjb21tZW50JyB9XSwgcGFnaW5hdGlvbjoge30gfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2hvd1NuYWNrQmFyT25SZW1vdmVTdWNjZXNzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IENvbW1lbnRBY3Rpb25zLlJlbW92ZVN1Y2Nlc3MuVHlwZVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdzbmFja2JhcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2Rpc3BsYXknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbJ0NPTU1FTlRTLkRFTEVURV9TVUNDRVNTX1RPQVNUJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZ2V0Q291bnRzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IENvbW1lbnRBY3Rpb25zLkdldENvdW50cy5UeXBlLFxuICAgICAgICBwYXJlbnRPYmplY3Q6IHsgc29tZTogJ3BhcmVudE9iamVjdCcgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2dldENvdW50c0ZvcicsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncGFyZW50T2JqZWN0JyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBhYmM6IDEgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdjb21tZW50JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ2V0Q291bnRzU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IGFiYzogMSB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
